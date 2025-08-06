'use client';

import { TokenSwap } from '@/components/TokenSwap';

export default function Home() {
  return (
    <main className="min-h-screen p-10 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">ChainEx Token Swap 🔁</h1>
        <TokenSwap />
      </div>
    </main>
  );
}
