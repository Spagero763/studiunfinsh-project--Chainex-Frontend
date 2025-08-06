'use client'

import { TokenSwap } from '@/components/TokenSwap'

export default function SwapPage() {
  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">ChainEx Token Swap 🔁</h1>
      <TokenSwap />
    </main>
  )
}
