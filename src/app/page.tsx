import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Lightning-Fast Swaps",
    description: "Execute trades in seconds with our optimized routing and low-latency infrastructure.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Deep Liquidity",
    description: "Access deep liquidity pools for minimal slippage and the best possible rates.",
  },
  {
    icon: <ArrowRight className="h-6 w-6 text-primary" />,
    title: "Earn Passive Income",
    description: "Stake your assets in our secure pools to earn competitive yields and rewards.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <main className="flex flex-col items-center justify-center flex-1">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-indigo-400">
            The Future of Decentralized Exchange
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Swap, earn, and build on the leading decentralized crypto trading protocol.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/swap">
                Start Swapping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/liquidity">
                Provide Liquidity
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-24 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}