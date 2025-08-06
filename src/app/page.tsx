import { Button } from '~/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
          Welcome to ChainEx DEX
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          The most secure and efficient way to swap, stake, and earn rewards in the DeFi space.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <Button asChild size="lg">
            <Link href="/swap">Start Swapping</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/stake">Stake Tokens</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}