import { Router } from "express";
import webhookRouter from "./webhookRoute";
import triggerEventRouter from "./triggerEventRoute";

const router = Router();

router.use("/webhooks", webhookRouter);
router.use("/trigger-event", triggerEventRouter);

export default router;
