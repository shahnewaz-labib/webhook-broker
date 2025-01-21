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
