import { deadLetterQueue } from './queues/deadLetterQueue';
import { mainQueue } from './queues/mainQueue';

export const logState = async () => {
  const mqJobs = await mainQueue.getJobs([
    'waiting',
    'active',
    'completed',
    'failed',
    'delayed',
  ]);
  console.log('============ All Jobs in MQ =============');
  mqJobs.forEach((job) => {
    const status = job.finishedOn
      ? 'completed'
      : job.failedReason
        ? 'failed'
        : job.delay
          ? 'delayed'
          : 'active';
    console.log(`Job ID: ${job.id}, Status: ${status}, Queue: Main Queue`);
  });

  const dlqActiveCount = await deadLetterQueue.getActiveCount();
  const dlqWaitingCount = await deadLetterQueue.getWaitingCount();

  console.log('============ DLQ =============');
  console.log(`Active jobs: ${dlqActiveCount}`);
  console.log(`Waiting jobs: ${dlqWaitingCount}`);

  const dlqJobs = await deadLetterQueue.getJobs(['waiting', 'active']);
  console.log('============ All Jobs in DLQ =============');
  dlqJobs.forEach((job) => {
    console.log(
      `Job ID: ${job.id}, Status: ${job.finishedOn ? 'completed' : 'active'}, Queue: Dead Letter Queue`,
    );
  });
  console.log('==========================================');
};
