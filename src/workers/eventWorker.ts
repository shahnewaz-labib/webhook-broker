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

const webhookWorker = new Worker(
  'webhookQueue',
  async (job) => {
    const { eventName, webhookUrl, payload } = job.data;

    // Process the job (e.g., send a webhook request)
    console.log(
      `Processing webhook for event: ${eventName} to URLs: ${webhookUrl} with payload:`,
      payload,
    );

    try {
      // Send HTTP POST request to each webhook URL
      for (const url of webhookUrl) {
        const response = await axios.post(url, payload);

        console.log(`Successfully sent webhook to ${url}`);
        console.log(`Status Code: ${response.status}`);
        console.log(`Response Body: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      if (error) console.error(`Failed to send webhook: ${error}`);

      throw error; // Re-throw the error to mark the job as failed
    }
  },
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
