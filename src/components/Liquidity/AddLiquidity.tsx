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

export function AddLiquidity() {
  const { isConnected } = useAccount();
  const { toast } = useToast();

  const [tokenA, setTokenA] = React.useState('');
  const [tokenB, setTokenB] = React.useState('');
  const [amountA, setAmountA] = React.useState('');
  const [amountB, setAmountB] = React.useState('');

  const { data: hash, writeContract, isPending } = useWriteContract({
    mutation: {
      onSuccess: (hash) => {
        toast({
          title: 'Add Liquidity Submitted',
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

  const handleAddLiquidity = () => {
    if (!tokenA || !tokenB || !amountA || !amountB) return;
    writeContract({
      address: ChainExContracts.dex as `0x${string}`,
      abi: ChainExABIs.dexAbi,
      functionName: 'addLiquidity',
      args: [
        tokenA as `0x${string}`,
        tokenB as `0x${string}`,
        parseUnits(amountA, 18),
        parseUnits(amountB, 18),
      ],
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="tokenA_add">Token A Address</Label>
        <Input
          id="tokenA_add"
          placeholder="0xTokenAAddress"
          value={tokenA}
          onChange={(e) => setTokenA(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="amountA_add">Amount A</Label>
        <Input
          id="amountA_add"
          type="number"
          placeholder="e.g. 100"
          value={amountA}
          onChange={(e) => setAmountA(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="tokenB_add">Token B Address</Label>
        <Input
          id="tokenB_add"
          placeholder="0xTokenBAddress"
          value={tokenB}
          onChange={(e) => setTokenB(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="amountB_add">Amount B</Label>
        <Input
          id="amountB_add"
          type="number"
          placeholder="e.g. 100"
          value={amountB}
          onChange={(e) => setAmountB(e.target.value)}
        />
      </div>
      <Button
        className="w-full"
        onClick={handleAddLiquidity}
        disabled={!isConnected || isPending || isConfirming || !tokenA || !tokenB || !amountA || !amountB}
      >
        {isPending || isConfirming ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Add Liquidity'
        )}
      </Button>
      {isSuccess && <p className="text-green-500 mt-2 text-center">✅ Liquidity added!</p>}
    </div>
  );
}