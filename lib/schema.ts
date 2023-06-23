import { z } from "zod";

// Schema for the data object model
export const transactionSchema = z.object({
  txID: z.string(),
  timestamp: z.string(),
  type: z.string(),
  method: z.string().optional(),
  amount: z.number(),
  balance: z.number(),
  source: z.string().optional(),
  destination: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
