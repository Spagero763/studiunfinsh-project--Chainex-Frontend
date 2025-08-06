import { Watchlist } from '@/components/Watchlist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="max-w-5xl text-left w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Welcome to ChainEx</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    Unlock 100 USDT Welcome Rewards!
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Complete tasks to claim your rewards.
                  </p>
                  <Button className="mt-4">
                    Claim Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <Image
                  src="https://placehold.co/150x150.png"
                  alt="Welcome Rewards"
                  width={150}
                  height={150}
                  data-ai-hint="rocket"
                />
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Express Checkout</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="https://placehold.co/40x40.png"
                    alt="Bitcoin"
                    width={40}
                    height={40}
                    data-ai-hint="bitcoin"
                  />
                  <div>
                    <h3 className="font-bold text-lg">Bitcoin</h3>
                    <p className="text-muted-foreground text-sm">Last Price: $26,248.92</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-bold">+144.38%</p>
                  <p className="text-muted-foreground text-xs">in the last 3 years</p>
                </div>
                <Button variant="secondary">Buy Now</Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Link href="/swap">
              <Card className="bg-primary text-primary-foreground h-full flex flex-col justify-between hover:bg-primary/90 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap /> Lightning-Fast Swaps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Execute trades in seconds with our optimized routing and
                    low-latency infrastructure.
                  </p>
                  <div className="mt-4 text-lg font-bold flex items-center">
                    Start Swapping <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <Watchlist />
        </div>
      </main>
    </div>
  );
}
