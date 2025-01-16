import { Request, Response, Router } from 'express';
import { webhookController } from '../controllers/webhookController';
import { validateSchema } from '../middlewares/validateSchema';
import { webhookSchema } from '../schemas/webhookSchema';

const webhookRouter = Router();

webhookRouter.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

webhookRouter.get('/', webhookController.getAllWebhooks);

webhookRouter.post(
  '/',
  validateSchema(webhookSchema),
  webhookController.createWebhook,
);

export default webhookRouter;
