'use server';

import {
  analyzeOptimalStake,
  type AnalyzeOptimalStakeInput,
  type AnalyzeOptimalStakeOutput,
} from '@/ai/flows/optimal-stake-analyzer';

export async function getOptimalStake(
  input: AnalyzeOptimalStakeInput
): Promise<AnalyzeOptimalStakeOutput> {
  // In a real application, you might add more validation or logic here.
  const result = await analyzeOptimalStake(input);
  return result;
}
