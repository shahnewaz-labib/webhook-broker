import { Job, Worker, WorkerOptions } from 'bullmq';
import axios from 'axios';
import { addDeadLetterQueueJob } from '../queues/deadLetterQueue';
import { config } from '../queues/config';

const mainQueueWorkerOptions: WorkerOptions = {
  connection: config.redis,
  concurrency: config.mainQueue.concurrency,
};

const processJob = async (job: Job) => {
  const { webhookUrl, payload } = job.data;

  try {
    const response = await axios.post(webhookUrl, payload);
    console.log(`Successfully sent webhook to ${webhookUrl}`);
  } catch (error) {
    if (error)
      console.error(
        `[MQW] F ${job.id} | attemptsMade: ${job.attemptsMade} | job.opts.attempts: ${job.opts.attempts}`,
      );

    if (job.attemptsMade + 1 >= (job.opts.attempts || 0)) {
      await addDeadLetterQueueJob(job.data);
      console.log(`>> ${job.id} pushed to DLQ`);
    }

    throw error;
  }
};

const mainQueueWorker = new Worker(
  'mainQueue',
  async (job) => processJob(job),
  mainQueueWorkerOptions,
);

mainQueueWorker.on('completed', (job) => {
  console.log(`[MQW] Job ${job.id} has completed!`);
});

mainQueueWorker.on('failed', (job, err) => {
  if (job) console.error(`[MQW] Job ${job.id} failed -> ${err.message}`);
});

mainQueueWorker.on('ready', () => {
  console.log('[MQW] mainQueueWorker is ready');
});
