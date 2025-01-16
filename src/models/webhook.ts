import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const webhookSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      unique: true,
    },
    webhookUrl: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const WebhookModel = mongoose.model('Webhook', webhookSchema);
