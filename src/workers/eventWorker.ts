import { Worker } from 'bullmq';
import { webhookQueue } from '../queues/eventQueue';

const webhookWorker = new Worker(
    'webhookQueue',
    async job => {
        const { eventName, webhookUrl, payload } = job.data;
        // Process the job (e.g., send a webhook request)
        console.log(`Processing webhook for event: ${eventName} to URLs: ${webhookUrl} with payload:`, payload);
        // Add your webhook processing logic here
    },
    {
        connection: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
        },
    }
);

webhookWorker.on('completed', job => {
    console.log(`Job ${job.id} has completed!`);
});

webhookWorker.on('failed', (job, err) => {
    if (job) {
        console.error(`Job ${job.id} has failed with ${err.message}`);
    } else {
        console.error(`A job has failed with ${err.message}`);
    }
});

webhookWorker.on('ready', () => {
    console.log('Worker is connected and ready to process jobs.');
});