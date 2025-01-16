import { Request, Response, Router } from "express";
import { webhookController } from "../controllers/webhookController";

const webhookRouter = Router();

webhookRouter.get("/ping", (req: Request, res: Response) => {
	res.json({ message: "pong" });
});

webhookRouter.get("/", webhookController.getAllWebhooks);

webhookRouter.post("/", webhookController.createWebhook);

export default webhookRouter;
