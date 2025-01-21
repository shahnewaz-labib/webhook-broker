import { WebhookModel } from '../models/webhook';

export const webhookService = {
  createWebhook: async (eventName: string, webhookUrl: string) => {
    const existingWebhook = await WebhookModel.findOne({ eventName });
    if (!existingWebhook) {
      const newWebhook = await WebhookModel.create({ eventName, webhookUrl });
      return { webhook: newWebhook, isNew: true };
    }

    const updatedWebhook = await WebhookModel.findOneAndUpdate(
      { eventName },
      { $addToSet: { webhookUrl } },
      { new: true },
    );

    return { webhook: updatedWebhook, isNew: false };
  },

  getAllWebhooks: async () => {
    return await WebhookModel.find().select('eventName webhookUrl -_id');
  },
};
