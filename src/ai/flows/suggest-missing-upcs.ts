// src/ai/flows/suggest-missing-upcs.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting potential UPCs for items with missing UPCs on an invoice.
 *
 * - suggestMissingUpcs - A function that takes item names and vendor information and returns suggested UPCs.
 * - SuggestMissingUpcsInput - The input type for the suggestMissingUpcs function.
 * - SuggestMissingUpcsOutput - The return type for the suggestMissingUpcs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMissingUpcsInputSchema = z.object({
  itemName: z.string().describe('The name of the item for which to suggest a UPC.'),
  vendorName: z.string().describe('The name of the vendor of the item.'),
});
export type SuggestMissingUpcsInput = z.infer<typeof SuggestMissingUpcsInputSchema>;

const SuggestMissingUpcsOutputSchema = z.object({
  suggestedUpcs: z.array(z.string()).describe('An array of suggested UPCs for the item.'),
});
export type SuggestMissingUpcsOutput = z.infer<typeof SuggestMissingUpcsOutputSchema>;

export async function suggestMissingUpcs(input: SuggestMissingUpcsInput): Promise<SuggestMissingUpcsOutput> {
  return suggestMissingUpcsFlow(input);
}

const suggestMissingUpcsPrompt = ai.definePrompt({
  name: 'suggestMissingUpcsPrompt',
  input: {schema: SuggestMissingUpcsInputSchema},
  output: {schema: SuggestMissingUpcsOutputSchema},
  prompt: `You are an expert at identifying products and their UPC codes.

  Given the item name and vendor, suggest up to 3 possible UPC codes.  Return them as a JSON array of strings.

  Item Name: {{{itemName}}}
  Vendor: {{{vendorName}}}
  `,
});

const suggestMissingUpcsFlow = ai.defineFlow(
  {
    name: 'suggestMissingUpcsFlow',
    inputSchema: SuggestMissingUpcsInputSchema,
    outputSchema: SuggestMissingUpcsOutputSchema,
  },
  async input => {
    const {output} = await suggestMissingUpcsPrompt(input);
    return output!;
  }
);
