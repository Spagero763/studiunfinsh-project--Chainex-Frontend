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
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ChainExContracts } from '@/constants/addresses';
import { ChainExABIs } from '@/constants/abis';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';

const analyzerFormSchema = z.object({
  amount: z.coerce.number().positive({ message: 'Amount must be positive' }),
  poolSize: z.coerce.number().positive({ message: 'Pool size must be positive' }),
  recentBlockActivity: z
    .string()
    .min(10, { message: 'Please provide more details on block activity.' }),
});

const stakeFormSchema = z.object({
  amount: z.coerce.number().positive('Amount must be a positive number.'),
});

const unstakeFormSchema = z.object({
  amount: z.coerce.number().positive('Amount must be a positive number.'),
});

function StakingStatus() {
  const { address } = useAccount();

  const { data: stakedBalance, isLoading: isLoadingStaked } = useReadContract({
    address: ChainExContracts.staking as `0x${string}`,
    abi: ChainExABIs.stakingAbi,
    functionName: 'staked',
    args: [address],
    query: {
      enabled: !!address,
    }
  });

  const { data: rewards, isLoading: isLoadingRewards } = useReadContract({
    address: ChainExContracts.staking as `0x${string}`,
    abi: ChainExABIs.stakingAbi,
    functionName: 'rewards',
    args: [address],
    query: {
      enabled: !!address,
    }
  });

  return (
    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Staked Balance</p>
        <p className="font-bold">{isLoadingStaked ? '...' : `${stakedBalance ? formatEther(stakedBalance as bigint) : '0'} CEX`}</p>
      </div>
       <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Pending Rewards</p>
        <p className="font-bold text-green-600">{isLoadingRewards ? '...' : `${rewards ? formatEther(rewards as bigint) : '0'} CEX`}</p>
      </div>
    </div>
  )
}

function StakeForm() {
  const { toast } = useToast();
  const { data: hash, writeContract, isPending } = useWriteContract({
    mutation: {
      onSuccess: (hash) => {
        toast({
          title: 'Stake Submitted',
          description: `Transaction hash: ${hash.slice(0,10)}...`
        });
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const form = useForm<z.infer<typeof stakeFormSchema>>({
    resolver: zodResolver(stakeFormSchema),
    defaultValues: { amount: 0 },
  });

  function onSubmit(values: z.infer<typeof stakeFormSchema>) {
    writeContract({
      address: ChainExContracts.staking as `0x${string}`,
      abi: ChainExABIs.stakingAbi,
      functionName: 'stake',
      args: [parseEther(values.amount.toString())],
    });
  }

  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount to Stake</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending || isConfirming} className="w-full">
          {isPending || isConfirming ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Staking...</> : 'Stake'}
        </Button>
      </form>
     </Form>
  )
}

function UnstakeForm() {
  const { toast } = useToast();
  const { data: hash, writeContract, isPending } = useWriteContract({
     mutation: {
      onSuccess: (hash) => {
        toast({
          title: 'Unstake Submitted',
          description: `Transaction hash: ${hash.slice(0,10)}...`
        });
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const form = useForm<z.infer<typeof unstakeFormSchema>>({
    resolver: zodResolver(unstakeFormSchema),
    defaultValues: { amount: 0 },
  });

  function onSubmit(values: z.infer<typeof unstakeFormSchema>) {
    writeContract({
      address: ChainExContracts.staking as `0x${string}`,
      abi: ChainExABIs.stakingAbi,
      functionName: 'unstake',
      args: [parseEther(values.amount.toString())],
    });
  }

  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount to Unstake</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" disabled={isPending || isConfirming} className="w-full">
          {isPending || isConfirming ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Unstaking...</> : 'Unstake'}
        </Button>
      </form>
     </Form>
  )
}

function ClaimRewardsButton() {
  const { toast } = useToast();
  const { data: hash, writeContract, isPending } = useWriteContract({
     mutation: {
      onSuccess: (hash) => {
        toast({
          title: 'Claim Submitted',
          description: `Transaction hash: ${hash.slice(0,10)}...`
        });
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleClaim = () => {
    writeContract({
      address: ChainExContracts.staking as `0x${string}`,
      abi: ChainExABIs.stakingAbi,
      functionName: 'claimRewards',
    });
  };

  return (
    <Button onClick={handleClaim} disabled={isPending || isConfirming} className="w-full">
      {isPending || isConfirming ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Claiming...</> : 'Claim Rewards'}
    </Button>
  );
}


export function StakePanel() {
  const [stakeAmount, setStakeAmount] = React.useState(50);
  const [aiResult, setAiResult] =
    React.useState<AnalyzeOptimalStakeOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { isConnected } = useAccount();

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
      // Convert the stake amount to a number before setting it.
      const suggestedAmount = Number(aiResult.suggestedStakeAmount);
      if (!isNaN(suggestedAmount)) {
        setStakeAmount(suggestedAmount);
      }
    }
  }, [aiResult]);

  return (
    <Card className="shadow-2xl shadow-primary/10 w-full max-w-2xl">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <StakingStatus />
                <StakeForm />
                <UnstakeForm />
                <ClaimRewardsButton />
              </div>
              <div className="p-6 border rounded-lg space-y-4 flex flex-col justify-center">
                 <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Manual Stake</h3>
                    <p className="text-sm text-muted-foreground">Use the slider to manually select an amount to stake.</p>
                 </div>
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
                 <Button size="lg" className="w-full text-lg py-6" disabled={!isConnected}>
                    Stake Manually
                  </Button>
              </div>
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
