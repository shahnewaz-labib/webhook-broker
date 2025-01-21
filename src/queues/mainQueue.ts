import { Queue } from 'bullmq';
import { config } from './config';

export const mainQueue = new Queue(config.mainQueue.name, {
  connection: config.redis,
});

export const addMainQueueJob = async (jobData: any) => {
  await mainQueue.add('mainQueueJob', jobData, {
    attempts: config.mainQueue.retryAttempts,
    backoff: config.mainQueue.backoff,
  });
};
