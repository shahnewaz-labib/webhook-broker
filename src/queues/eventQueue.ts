import { Queue } from 'bullmq';

export const webhookQueue = new Queue('webhookQueue', {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
  },
});