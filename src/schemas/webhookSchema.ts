import { z } from 'zod';

export const webhookSchema = z.object({
  eventName: z.string().min(3),
  webhookUrl: z.string().url(),
});

export type Webhook = z.infer<typeof webhookSchema>;
