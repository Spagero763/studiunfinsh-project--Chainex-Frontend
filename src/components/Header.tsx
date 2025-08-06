'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="w-full bg-gray-950 border-b border-gray-800 px-4 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          ChainEx DEX
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/swap" className="hover:text-gray-300">
            Swap
          </Link>
           <Link href="/liquidity" className="hover:text-gray-300">
            Liquidity
          </Link>
          <Link href="/stake" className="hover:text-gray-300">
            Staking
          </Link>
          <Link href="/membership" className="hover:text-gray-300">
            Membership
          </Link>
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
}
