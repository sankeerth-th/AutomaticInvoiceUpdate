'use server';

/**
 * @fileOverview A flow for parsing invoice data from an image or PDF using OCR and AI.
 *
 * - parseInvoiceData - A function that handles the invoice parsing process.
 * - ParseInvoiceDataInput - The input type for the parseInvoiceData function.
 * - ParseInvoiceDataOutput - The return type for the parseInvoiceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseInvoiceDataInputSchema = z.object({
  invoiceDataUri: z
    .string()
    .describe(
      "The invoice image or PDF as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ParseInvoiceDataInput = z.infer<typeof ParseInvoiceDataInputSchema>;

const InvoiceLineItemSchema = z.object({
  upc: z.string().optional().describe('The UPC code of the item.'),
  itemName: z.string().describe('The name of the item.'),
  quantityCases: z.number().optional().describe('The quantity in cases, if applicable.'),
  quantityBottles: z.number().optional().describe('The quantity in bottles, if applicable.'),
  unitPrice: z.number().describe('The price per unit.'),
  totalPrice: z.number().describe('The total price of the line item.'),
  vendorItemNumber: z.string().optional().describe('The vendor item number.'),
  flags: z.array(z.string()).optional().describe('Any flags or warnings for the line item (e.g., price delta).'),
});

const ParseInvoiceDataOutputSchema = z.object({
  lineItems: z.array(InvoiceLineItemSchema).describe('The extracted line items from the invoice.'),
});
export type ParseInvoiceDataOutput = z.infer<typeof ParseInvoiceDataOutputSchema>;


const shouldApplyNormalizationRules = ai.defineTool({
  name: 'shouldApplyNormalizationRules',
  description: 'Determines whether normalization rules should be applied to the extracted invoice data based on vendor and other factors.',
  inputSchema: z.object({
    vendorName: z.string().describe('The name of the vendor.'),
    invoiceTotal: z.number().describe('The total amount of the invoice.'),
  }),
  outputSchema: z.boolean(),
}, async (input) => {
  // TODO: Implement the logic to determine whether normalization rules should be applied.
  // This could involve checking against a database of known vendors or applying heuristics.
  // For now, always return true.
  return true;
});


export async function parseInvoiceData(input: ParseInvoiceDataInput): Promise<ParseInvoiceDataOutput> {
  return parseInvoiceDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseInvoiceDataPrompt',
  input: {schema: ParseInvoiceDataInputSchema},
  output: {schema: ParseInvoiceDataOutputSchema},
  prompt: `You are an expert in parsing invoice data from images and PDFs. Extract the line items from the invoice, including UPC (if available), item name, quantity (cases and/or bottles), unit price, total price, and vendor item number.  If a field is not present in the invoice, leave it blank.  If quantities are provided, include both quantityCases and quantityBottles, otherwise, leave those fields blank.

    Here is the invoice:
    {{media url=invoiceDataUri}}
  `,
});

const parseInvoiceDataFlow = ai.defineFlow(
  {
    name: 'parseInvoiceDataFlow',
    inputSchema: ParseInvoiceDataInputSchema,
    outputSchema: ParseInvoiceDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    // TODO: Apply normalization rules if necessary (based on vendor, etc.)
    // const applyRules = await shouldApplyNormalizationRules({
    //   vendorName: 'Unknown',
    //   invoiceTotal: 0,
    // });
    // if (applyRules) {
    //   // Apply normalization rules
    // }

    return output!;
  }
);
