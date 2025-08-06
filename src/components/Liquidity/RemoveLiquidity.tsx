'use client';

import * as React from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { ChainExContracts } from '@/constants/addresses';
import { ChainExABIs } from '@/constants/abis';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function RemoveLiquidity() {
  const { isConnected } = useAccount();
  const { toast } = useToast();

  const [tokenA, setTokenA] = React.useState('');
  const [tokenB, setTokenB] = React.useState('');
  const [lpAmount, setLpAmount] = React.useState('');

  const { data: hash, writeContract, isPending } = useWriteContract({
    mutation: {
      onSuccess: (hash) => {
        toast({
          title: 'Remove Liquidity Submitted',
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

  const handleRemoveLiquidity = () => {
    if (!tokenA || !tokenB || !lpAmount) return;
    writeContract({
      address: ChainExContracts.dex as `0x${string}`,
      abi: ChainExABIs.dexAbi,
      functionName: 'removeLiquidity',
      args: [
        tokenA as `0x${string}`,
        tokenB as `0x${string}`,
        parseUnits(lpAmount, 18),
      ],
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="tokenA_remove">Token A Address</Label>
        <Input
          id="tokenA_remove"
          placeholder="0xTokenAAddress"
          value={tokenA}
          onChange={(e) => setTokenA(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="tokenB_remove">Token B Address</Label>
        <Input
          id="tokenB_remove"
          placeholder="0xTokenBAddress"
          value={tokenB}
          onChange={(e) => setTokenB(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="lpAmount_remove">LP Token Amount</Label>
        <Input
          id="lpAmount_remove"
          type="number"
          placeholder="e.g. 50"
          value={lpAmount}
          onChange={(e) => setLpAmount(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={handleRemoveLiquidity}
        disabled={!isConnected || isPending || isConfirming || !tokenA || !tokenB || !lpAmount}
      >
        {isPending || isConfirming ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Remove Liquidity'
        )}
      </Button>
      {isSuccess && <p className="text-green-500 mt-2 text-center">✅ Liquidity removed!</p>}
    </div>
  );
}
