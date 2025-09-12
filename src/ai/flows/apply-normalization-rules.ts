'use server';

/**
 * @fileOverview Applies vendor-specific normalization rules during invoice parsing.
 *
 * - applyNormalizationRules - A function that applies the normalization rules.
 * - ApplyNormalizationRulesInput - The input type for the applyNormalizationRules function.
 * - ApplyNormalizationRulesOutput - The return type for the applyNormalizationRules function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ApplyNormalizationRulesInputSchema = z.object({
  invoiceData: z.record(z.any()).describe('The parsed invoice data to normalize.'),
  vendorName: z.string().describe('The name of the vendor for the invoice.'),
});
export type ApplyNormalizationRulesInput = z.infer<
  typeof ApplyNormalizationRulesInputSchema
>;

const ApplyNormalizationRulesOutputSchema = z.record(z.any()).describe('The normalized invoice data.');
export type ApplyNormalizationRulesOutput = z.infer<
  typeof ApplyNormalizationRulesOutputSchema
>;

export async function applyNormalizationRules(
  input: ApplyNormalizationRulesInput
): Promise<ApplyNormalizationRulesOutput> {
  return applyNormalizationRulesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'applyNormalizationRulesPrompt',
  input: {schema: ApplyNormalizationRulesInputSchema},
  output: {schema: ApplyNormalizationRulesOutputSchema},
  prompt: `You are an expert data normalization specialist.

You will receive invoice data and the vendor name. Your task is to apply vendor-specific normalization rules to correct any data inconsistencies, such as case-to-bottle conversions, UPC normalization, and price adjustments.

Vendor Name: {{{vendorName}}}
Invoice Data: {{{invoiceData}}}

Return the normalized invoice data in the same JSON format as the input.

Ensure that the output is valid JSON.`,
});

const applyNormalizationRulesFlow = ai.defineFlow(
  {
    name: 'applyNormalizationRulesFlow',
    inputSchema: ApplyNormalizationRulesInputSchema,
    outputSchema: ApplyNormalizationRulesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
