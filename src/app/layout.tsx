import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import Header from '@/components/Header';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata: Metadata = {
  title: 'ChainEx DEX',
  description: 'Decentralized token swapping & staking powered by ChainEx',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
