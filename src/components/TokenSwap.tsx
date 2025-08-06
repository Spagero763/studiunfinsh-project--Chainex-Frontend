'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { ChainExABIs } from '@/constants/abis';
import { ChainExContracts, MOCK_TOKEN_ADDRESSES } from '@/constants/addresses';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, ArrowDownUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function TokenSwap() {
  const { isConnected } = useAccount();
  const { toast } = useToast();

  const [amountIn, setAmountIn] = useState('');
  const [tokenIn, setTokenIn] = useState(MOCK_TOKEN_ADDRESSES.ETH);
  const [tokenOut, setTokenOut] = useState(ChainExContracts.cexToken);
  
  const { data: hash, writeContract, isPending, error } = useWriteContract({
      mutation: {
        onSuccess: (hash) => {
            toast({
            title: 'Swap Submitted',
            description: `Transaction hash: ${hash.slice(0, 10)}...`,
            });
        },
        onError: (error) => {
            toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
            });
        },
    },
  });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSwap = () => {
    if (!amountIn || !tokenIn || !tokenOut) return;
    writeContract({
      address: ChainExContracts.dex as `0x${string}`,
      abi: ChainExABIs.dexAbi,
      functionName: 'swap',
      args: [
        tokenIn as `0x${string}`,
        tokenOut as `0x${string}`,
        parseEther(amountIn || '0'),
      ],
    });
  };

  const handleSwitchTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
  }

  useEffect(() => {
    if (isSuccess) {
      setAmountIn('');
    }
  }, [isSuccess]);
  

  return (
    <Card className="w-full max-w-md shadow-2xl shadow-primary/10 mx-auto">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Select tokens and enter the amount to swap.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token-in">From</Label>
          <div className='flex gap-2'>
            <Select value={tokenIn} onValueChange={setTokenIn}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a token" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={MOCK_TOKEN_ADDRESSES.ETH}>ETH</SelectItem>
                    <SelectItem value={ChainExContracts.cexToken}>CEX</SelectItem>
                </SelectContent>
            </Select>
            <Input
                id="amount-in"
                type="number"
                placeholder="0.0"
                value={amountIn}
                onChange={(e) => setAmountIn(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-center">
            <Button variant="ghost" size="icon" onClick={handleSwitchTokens}>
                <ArrowDownUp className="h-4 w-4" />
            </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-out">To</Label>
           <Select value={tokenOut} onValueChange={setTokenOut}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a token" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={MOCK_TOKEN_ADDRESSES.ETH}>ETH</SelectItem>
                    <SelectItem value={ChainExContracts.cexToken}>CEX</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <Button
          onClick={handleSwap}
          disabled={!isConnected || isPending || isConfirming || !amountIn}
          className="w-full"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Swapping...
            </>
          ) : (
            'Swap'
          )}
        </Button>

        {isSuccess && (
          <p className="mt-4 text-green-500 font-medium text-center">
            ✅ Swap confirmed!
          </p>
        )}
      </CardContent>
    </Card>
  );
}