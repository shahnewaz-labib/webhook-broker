import { Queue } from 'bullmq';

export const config = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  mainQueue: {
    name: 'mainQueue',
    concurrency: 50,
    pollingInterval: 1000,
    retryAttempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
  deadLetterQueue: {
    name: 'deadLetterQueue',
    concurrency: 20,
    pollingInterval: 5000,
    retryAttempts: 5,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
};

export const mainQueue = new Queue(config.mainQueue.name, {
  connection: config.redis,
});

export const deadLetterQueue = new Queue(config.deadLetterQueue.name, {
  connection: config.redis,
});

export const addMainQueueJob = async (jobData: any) => {
  await mainQueue.add('mainQueueJob', jobData, {
    attempts: config.mainQueue.retryAttempts,
    backoff: config.mainQueue.backoff,
  });
};

export const addDeadLetterQueueJob = async (jobData: any) => {
  await mainQueue.add('deadLetterQueueJob', jobData, {
    attempts: config.mainQueue.retryAttempts,
    backoff: config.mainQueue.backoff,
  });
};
