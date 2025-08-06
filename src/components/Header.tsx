'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { MountainIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center shadow-sm border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">ChainEx</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          href="/swap"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Swap
        </Link>
        <Link
          href="/stake"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Stake
        </Link>
        <Link
          href="/membership"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Membership
        </Link>
        <ConnectButton />
      </nav>
    </header>
  );
}