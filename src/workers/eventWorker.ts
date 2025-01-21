import { Worker, WorkerOptions } from 'bullmq';
import axios from 'axios';
import { webhookQueue } from '../queues/eventQueue';

const workerOptions: WorkerOptions = {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  concurrency: parseInt(process.env.WORKER_COUNT || '1', 10),
};

const processJob = async (job: any) => {
  const { eventName, webhookUrl, payload } = job.data;

  console.log(
    `Processing webhook for event: ${eventName} to URLs: ${webhookUrl} with payload:`,
    payload,
  );

  try {
    for (const url of webhookUrl) {
      const response = await axios.post(url, payload);

      console.log(`Successfully sent webhook to ${url}`);
      console.log(`Status Code: ${response.status}`);
      console.log(`Response Body: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    if (error) console.error(`Failed to send webhook: ${error}`);

    throw error;
  }
};

const webhookWorker = new Worker(
  'webhookQueue',
  async (job) => processJob(job),
  workerOptions,
);

webhookWorker.on('completed', (job) => {
  console.log(`Job ${job.id} has completed!`);
});

webhookWorker.on('failed', (job, err) => {
  if (job) console.error(`Job ${job.id} has failed with ${err.message}`);
});

webhookWorker.on('ready', () => {
  console.log('Webhook worker is ready');
});

const logState = async () => {
  const activeCount = await webhookQueue.getActiveCount();
  const waitingCount = await webhookQueue.getWaitingCount();

  console.log('=========================');
  console.log(`Active jobs: ${activeCount}`);
  console.log(`Waiting jobs: ${waitingCount}`);
  console.log('=========================');
};

setInterval(logState, 1000);
