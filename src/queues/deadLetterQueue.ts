import { Queue } from 'bullmq';
import { config } from './config';

export const deadLetterQueue = new Queue(config.deadLetterQueue.name, {
  connection: config.redis,
});

export const addDeadLetterQueueJob = async (jobData: any) => {
  await deadLetterQueue.add('deadLetterQueueJob', jobData, {
    attempts: config.mainQueue.retryAttempts,
    backoff: config.mainQueue.backoff,
  });
};
