import { config } from 'dotenv';
config();

import '@/ai/flows/parse-invoice-data.ts';
import '@/ai/flows/suggest-missing-upcs.ts';
import '@/ai/flows/apply-normalization-rules.ts';