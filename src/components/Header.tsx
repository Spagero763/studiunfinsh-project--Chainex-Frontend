'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="w-full bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="text-xl font-bold text-white">
          ChainEx
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/swap" className="text-muted-foreground hover:text-foreground transition-colors">
            Swap
          </Link>
           <Link href="/liquidity" className="text-muted-foreground hover:text-foreground transition-colors">
            Liquidity
          </Link>
          <Link href="/stake" className="text-muted-foreground hover:text-foreground transition-colors">
            Staking
          </Link>
          <Link href="/membership" className="text-muted-foreground hover:text-foreground transition-colors">
            Membership
          </Link>
        </nav>
        <ConnectButton />
      </div>
    </header>
  );
}