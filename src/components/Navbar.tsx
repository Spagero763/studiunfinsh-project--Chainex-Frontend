'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-xl">ChainEx</h1>
        <Link href="/swap" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Swap</Link>
        <Link href="/stake" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Stake</Link>
        <Link href="/membership" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Membership</Link>
      </div>
      <ConnectButton />
    </nav>
  )
}
