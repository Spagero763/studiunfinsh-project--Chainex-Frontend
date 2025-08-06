'use server';

/**
 * @fileOverview An AI tool to assist the user with calculating optimum times to stake their tokens based on recent block activity and pool size.
 *
 * - analyzeOptimalStake - A function that handles the analysis of optimal stake.
 * - AnalyzeOptimalStakeInput - The input type for the analyzeOptimalStake function.
 * - AnalyzeOptimalStakeOutput - The return type for the analyzeOptimalStake function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeOptimalStakeInputSchema = z.object({
  amount: z
    .number()
    .describe('The amount of tokens the user is considering staking.'),
  recentBlockActivity: z
    .string()
    .describe('Recent block activity information.'),
  poolSize: z.number().describe('The current size of the staking pool.'),
});
export type AnalyzeOptimalStakeInput = z.infer<typeof AnalyzeOptimalStakeInputSchema>;

const AnalyzeOptimalStakeOutputSchema = z.object({
  suggestedStakeTime: z
    .string()
    .describe('A suggestion of when to stake the tokens.'),
  suggestedStakeAmount: z
    .number()
    .describe('The suggested amount of tokens to stake.'),
  rationale: z
    .string()
    .describe('The rationale behind the staking suggestions.'),
});
export type AnalyzeOptimalStakeOutput = z.infer<typeof AnalyzeOptimalStakeOutputSchema>;

export async function analyzeOptimalStake(
  input: AnalyzeOptimalStakeInput
): Promise<AnalyzeOptimalStakeOutput> {
  return analyzeOptimalStakeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeOptimalStakePrompt',
  input: {schema: AnalyzeOptimalStakeInputSchema},
  output: {schema: AnalyzeOptimalStakeOutputSchema},
  prompt: `You are an expert in optimizing staking strategies for users.

  Given the amount of tokens a user is considering staking, recent block activity, and the pool size, provide a suggestion of when to stake the tokens, how much to stake, and a rationale for your suggestions.

  Amount: {{{amount}}}
  Recent Block Activity: {{{recentBlockActivity}}}
  Pool Size: {{{poolSize}}}

  Consider these factors when determining the optimal staking strategy. Please make sure to include the factors you considered in the rationale.
  - Recent block activity and how it may impact staking rewards
  - Pool size and how it influences the percentage of rewards earned
  - Gas fees and how they impact the profitability of staking a smaller amount
  - Potential risks of staking all tokens at once
  `,
});

const analyzeOptimalStakeFlow = ai.defineFlow(
  {
    name: 'analyzeOptimalStakeFlow',
    inputSchema: AnalyzeOptimalStakeInputSchema,
    outputSchema: AnalyzeOptimalStakeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
