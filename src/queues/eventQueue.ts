import { Queue } from 'bullmq';

export const webhookQueue = new Queue('webhookQueue', {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
});

export const addWebhookJob = async (jobData: any) => {
  await webhookQueue.add('webhookJob', jobData, {
    attempts: 5, // Number of retry attempts
    backoff: {
      type: 'exponential',
      delay: 5000, // Initial delay of 5 seconds
    },
  });
};
