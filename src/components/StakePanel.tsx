'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type {
  AnalyzeOptimalStakeInput,
  AnalyzeOptimalStakeOutput,
} from '@/ai/flows/optimal-stake-analyzer';
import { getOptimalStake } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';

const analyzerFormSchema = z.object({
  amount: z.coerce.number().positive({ message: 'Amount must be positive' }),
  poolSize: z.coerce.number().positive({ message: 'Pool size must be positive' }),
  recentBlockActivity: z
    .string()
    .min(10, { message: 'Please provide more details on block activity.' }),
});

export function StakePanel() {
  const [stakeAmount, setStakeAmount] = React.useState(50);
  const [aiResult, setAiResult] =
    React.useState<AnalyzeOptimalStakeOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof analyzerFormSchema>>({
    resolver: zodResolver(analyzerFormSchema),
    defaultValues: {
      amount: 1000,
      poolSize: 1000000,
      recentBlockActivity: 'Moderate activity with occasional spikes in gas fees.',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof analyzerFormSchema>> = async (
    data
  ) => {
    setIsLoading(true);
    setError(null);
    setAiResult(null);
    try {
      const result = await getOptimalStake(data as AnalyzeOptimalStakeInput);
      setAiResult(result);
    } catch (e) {
      setError('An error occurred while analyzing. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (aiResult?.suggestedStakeAmount) {
      setStakeAmount(aiResult.suggestedStakeAmount);
    }
  }, [aiResult]);

  return (
    <Card className="shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle>Staking</CardTitle>
        <CardDescription>
          Stake your tokens to earn rewards and participate in governance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stake">Stake</TabsTrigger>
            <TabsTrigger value="analyzer">AI Analyzer</TabsTrigger>
          </TabsList>
          <TabsContent value="stake" className="pt-4">
            <div className="space-y-6">
              <div className="p-6 border rounded-lg space-y-4">
                <div className="flex justify-between items-baseline">
                  <Label htmlFor="stake-amount" className="text-lg">Amount to Stake</Label>
                  <span className="text-2xl font-bold text-primary">{stakeAmount.toLocaleString()}</span>
                </div>
                <Slider
                  id="stake-amount"
                  min={0}
                  max={10000}
                  step={10}
                  value={[stakeAmount]}
                  onValueChange={(value) => setStakeAmount(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>10,000</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                <div className="text-sm">
                  <p className="text-muted-foreground">Available to stake</p>
                  <p className="font-bold">15,000.00 TOK</p>
                </div>
                 <div className="text-sm text-right">
                  <p className="text-muted-foreground">Current APY</p>
                  <p className="font-bold text-green-600">~12.5%</p>
                </div>
              </div>
              <Button size="lg" className="w-full text-lg py-6">
                Stake Now
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="analyzer" className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tokens to Stake</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="poolSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Pool Size</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recentBlockActivity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recent Block Activity</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe recent network conditions..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        e.g., high/low gas fees, transaction volume.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Analyze Optimal Stake
                </Button>
              </form>
            </Form>
            {aiResult && (
              <Alert className="mt-6">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>AI Staking Suggestion</AlertTitle>
                <AlertDescription className="space-y-2 mt-2">
                  <p><strong>Time to Stake:</strong> {aiResult.suggestedStakeTime}</p>
                  <p><strong>Amount:</strong> <Badge variant="secondary">{aiResult.suggestedStakeAmount.toLocaleString()} TOK</Badge></p>
                  <p><strong>Rationale:</strong> {aiResult.rationale}</p>
                </AlertDescription>
              </Alert>
            )}
            {error && <p className="text-destructive mt-4">{error}</p>}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
