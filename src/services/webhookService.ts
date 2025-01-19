import { WebhookModel } from '../models/webhook';

export const webhookService = {
  createWebhook: async (eventName: string, webhookUrl: string) => {
    const existingWebhook = await WebhookModel.findOne({ eventName });
    if (!existingWebhook) {
      console.log("webhook doesn't exist, creating");
      const newWebhook = await WebhookModel.create({ eventName, webhookUrl });
      return { webhook: newWebhook, isNew: true };
    }

    console.log('webhook exists, updating');
    const updatedWebhook = await WebhookModel.findOneAndUpdate(
      { eventName },
      { $addToSet: { webhookUrl } },
      { new: true },
    );

    console.log('updatedWebhook', updatedWebhook);

    return { webhook: updatedWebhook, isNew: false };
  },

  getAllWebhooks: async () => {
    return await WebhookModel.find().select('eventName webhookUrl -_id');
  },
};
