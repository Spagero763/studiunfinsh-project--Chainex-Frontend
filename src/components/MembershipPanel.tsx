'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Basic',
    price: 'Free',
    features: ['Standard swap fees', 'Basic staking rewards', 'Community support'],
    cta: 'Current Plan',
    variant: 'outline' as const,
  },
  {
    name: 'Premium',
    price: '$19/mo',
    features: ['Lower swap fees', 'Boosted staking rewards', 'Priority support', 'Advanced analytics'],
    cta: 'Upgrade to Premium',
    variant: 'default' as const,
  },
  {
    name: 'VIP',
    price: '$99/mo',
    features: [
      'Zero swap fees',
      'Maximum staking rewards',
      'Dedicated support agent',
      'AI strategy builder',
      'Early access to new features'
    ],
    cta: 'Go VIP',
    variant: 'default' as const,
    primary: true,
  },
];

export function MembershipPanel() {
  return (
    <Card className="shadow-2xl shadow-primary/10 h-full">
      <CardHeader>
        <CardTitle>Membership</CardTitle>
        <CardDescription>Unlock exclusive benefits and maximize your earnings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {tiers.map((tier) => (
          <Card key={tier.name} className={tier.primary ? 'border-primary' : ''}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-baseline">
                <CardTitle className="text-lg">{tier.name}</CardTitle>
                <p className="text-xl font-bold">{tier.price}</p>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={tier.variant}
                className="w-full"
                disabled={tier.variant === 'outline'}
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
