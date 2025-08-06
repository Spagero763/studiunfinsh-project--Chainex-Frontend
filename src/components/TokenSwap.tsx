'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown } from 'lucide-react';

const tokens = [
  { id: 'eth', name: 'Ethereum', symbol: 'ETH' },
  { id: 'dai', name: 'Dai', symbol: 'DAI' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC' },
];

export function TokenSwap() {
  const [fromAmount, setFromAmount] = React.useState('');
  const [toAmount, setToAmount] = React.useState('');
  const [fromToken, setFromToken] = React.useState(tokens[0].id);
  const [toToken, setToToken] = React.useState(tokens[1].id);

  const handleSwap = () => {
    // Placeholder for swap logic
    console.log(`Swapping ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setFromAmount(amount);
    // Dummy conversion
    setToAmount(amount ? String(parseFloat(amount) * 1800) : '');
  };

  return (
    <Card className="w-full max-w-md shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle>Token Swap</CardTitle>
        <CardDescription>Instantly swap between cryptocurrencies.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2 p-4 border rounded-lg bg-background">
            <Label htmlFor="from-token" className="text-muted-foreground">From</Label>
            <div className="flex items-center gap-2">
              <Input
                id="from-token"
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={handleAmountChange}
                className="text-2xl border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
              />
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.id} value={token.id}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <p className="text-xs text-muted-foreground">Balance: 1.234 {tokens.find(t => t.id === fromToken)?.symbol}</p>
          </div>
          
          <div className="flex justify-center -my-3 z-10">
            <Button variant="outline" size="icon" className="rounded-full bg-background hover:bg-muted">
                <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-2 p-4 border rounded-lg bg-background">
            <Label htmlFor="to-token" className="text-muted-foreground">To</Label>
            <div className="flex items-center gap-2">
              <Input
                id="to-token"
                type="number"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="text-2xl border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
              />
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.id} value={token.id}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">Balance: 12,500.00 {tokens.find(t => t.id === toToken)?.symbol}</p>
          </div>
          
          <Button onClick={handleSwap} className="w-full text-lg py-6" size="lg">
            Swap Tokens
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
