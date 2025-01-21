import { WebhookModel } from '../models/webhook';
import { addMainQueueJob } from '../queues/eventQueue';

export const triggerEventService = {
  handleEvent: async (eventName: string, payload: any) => {
    const webhook = await WebhookModel.findOne({ eventName });
    if (!webhook) {
      return null;
    }

    const jobPromises = webhook.webhookUrl.map(async (url) => {
      const jobData: MainQueueJob = {
        eventName,
        webhookUrl: url,
        payload,
      };

      await addMainQueueJob(jobData);
    });

    await Promise.all(jobPromises);
    return true;
  },
};
