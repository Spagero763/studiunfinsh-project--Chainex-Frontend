import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Header } from '~/components/Header';
import { Toaster } from '~/components/ui/toaster';
import { cn } from '~/lib/utils';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata: Metadata = {
  title: 'ChainEx DEX',
  description: 'Swap, stake, and earn on ChainEx.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={cn('font-sans antialiased min-h-screen bg-background')}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}