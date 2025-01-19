import { Request, Response, Router } from 'express';
import { triggerEventController } from '../controllers/triggerEventController';

const triggerEventRouter = Router();

triggerEventRouter.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

triggerEventRouter.post('/:eventName', triggerEventController.triggerEvent);

export default triggerEventRouter;
