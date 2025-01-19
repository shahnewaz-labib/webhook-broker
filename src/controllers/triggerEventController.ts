import { Request, Response } from 'express';
import { triggerEventService } from '../services/triggerEventService';

export const triggerEventController = {
  triggerEvent: async (req: Request, res: Response) => {
    const eventName = req.params.eventName;
    const payload = req.body;
    console.log('eventName', eventName);
    console.log('payload', payload);
    try {
      const result = await triggerEventService.handleEvent(eventName, payload);
      if (!result) {
        res.status(404).json({ message: 'Event not found' });
      }
        res.status(202).json({ message: 'Event triggered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
  },
};