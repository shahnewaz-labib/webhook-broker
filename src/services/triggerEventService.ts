import { WebhookModel } from '../models/webhook';
import { addWebhookJob } from '../queues/eventQueue';

export const triggerEventService = {
  handleEvent: async (eventName: string, payload: any) => {
    const webhook = await WebhookModel.findOne({ eventName });
    if (!webhook) {
      return null;
    }

    const jobData = {
      eventName,
      webhookUrl: webhook.webhookUrl,
      payload,
    };

    await addWebhookJob(jobData);
    return true;
  },
};
