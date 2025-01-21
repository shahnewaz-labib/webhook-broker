import { Request, Response } from 'express';
import { triggerEventService } from '../services/triggerEventService';

export const triggerEventController = {
  triggerEvent: async (req: Request, res: Response) => {
    const eventName = req.params.eventName;
    const payload = req.body;

    try {
      const result = await triggerEventService.handleEvent(eventName, payload);
      if (!result) {
        res.status(404).json({ message: 'Event not found' });
        return;
      }
      res.status(202).json({ message: 'Event received for processing' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },
};
