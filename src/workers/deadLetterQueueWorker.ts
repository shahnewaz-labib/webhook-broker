import { Job, Worker, WorkerOptions } from 'bullmq';
import axios from 'axios';
import {
  addDeadLetterQueueJob,
  config,
  deadLetterQueue,
} from '../queues/eventQueue';

const processDeadLetterJob = async (job: Job) => {
  const { webhookUrl, payload } = job.data;

  try {
    const response = await axios.post(webhookUrl, payload);
    console.log(`Successfully sent webhook to ${webhookUrl}`);
  } catch (error) {
    if (error) {
      console.error(
        `[DLQW] F ${job.id} | attemptsMade: ${job.attemptsMade} | job.opts.attempts: ${job.opts.attempts}`,
      );
    }

    if (job.attemptsMade + 1 >= (job.opts.attempts || 0)) {
      console.log(
        `>> ${job.id} pushed to DLQ again (within processDeadLetterJob)`,
      );

      await addDeadLetterQueueJob(job.data);
    }

    throw error;
  }
};

const deadLetterQueueWorkerOptions: WorkerOptions = {
  connection: config.redis,
  concurrency: config.deadLetterQueue.concurrency,
};

const deadLetterQueueWorker = new Worker(
  'deadLetterQueue',
  async (job) => processDeadLetterJob(job),
  deadLetterQueueWorkerOptions,
);

deadLetterQueueWorker.on('completed', (job) => {
  console.log(`[DLQW] Job ${job.id} has completed!`);
});

deadLetterQueueWorker.on('failed', (job, err) => {
  if (job) console.error(`[DLQW] Job ${job.id} failed -> ${err.message}`);
});

deadLetterQueueWorker.on('ready', () => {
  console.log('[DLQW] deadLetterWorker is ready');
});
