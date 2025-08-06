'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { ChainExContracts } from '@/constants/addresses'
import { ChainExABIs } from '@/constants/abis'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export function TokenSwap() {
  const [amount, setAmount] = useState('')
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined)

  const { isConnected, address } = useAccount()
  const { writeContract, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSwap = async () => {
    if (!amount) return;
    try {
      writeContract({
        address: ChainExContracts.dex as `0x${string}`,
        abi: ChainExABIs.dexAbi,
        functionName: 'swapExactETHForTokens',
        value: parseEther(amount),
        args: [address], // recipient
      }, {
        onSuccess: (hash) => setHash(hash),
        onError: (error) => {
          console.error('Swap failed:', error)
        }
      })
    } catch (err) {
      console.error('Swap failed:', err)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl shadow-primary/10 mx-auto">
      <CardHeader>
        <CardTitle>Swap ETH for Tokens</CardTitle>
        <CardDescription>Enter the amount of ETH you want to swap.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="amount" className="block mb-2 font-medium">Amount in ETH:</Label>
          <Input
            id="amount"
            type="number"
            placeholder="e.g. 0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSwap}
          disabled={!isConnected || isPending || isConfirming || !amount}
          className="w-full"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Swapping...
            </>
          ) : 'Swap ETH → Token'}
        </Button>

        {isConfirmed && (
          <p className="mt-4 text-green-600 font-medium">
            ✅ Swap confirmed! TX: {hash?.slice(0, 10)}...
          </p>
        )}
      </CardContent>
    </Card>
  )
}
