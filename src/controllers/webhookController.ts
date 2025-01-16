import { Request, Response } from "express";
import { webhookService } from "../services/webhookService";

export const webhookController = {
	createWebhook: async (req: Request, res: Response) => {
		try {
			const { eventName, webhookUrl } = req.body;

			console.log("calling createWebhook", eventName, webhookUrl);
			const { webhook, isNew } = await webhookService.createWebhook(eventName, webhookUrl);
			if (!webhook) {
				res.status(500).json({ message: "webhook not created" });
			}

			if (isNew) {
				res.status(201).json({ message: "webhook created", webhook });
			} else {
				res.status(204).send();
			}
		} catch (error) {
			res.status(500).json({ message: "webhook not created", error });
		}
	},

	getAllWebhooks: async (req: Request, res: Response) => {
		try {
			const webhooks = await webhookService.getAllWebhooks();
			if (!webhooks) {
				res.status(404).json({ message: "webhooks not found" });
			}

			res.status(200).json(webhooks);
		} catch (error) {
			res.status(500).json({ message: "webhooks not found", error });
		}
	}
};
