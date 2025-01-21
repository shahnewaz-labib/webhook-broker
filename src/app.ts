import dotenv from 'dotenv';
import express, { Express } from 'express';
import router from './routes';
import morgan from 'morgan';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import { ExpressAdapter } from '@bull-board/express';
import { deadLetterQueue } from './queues/deadLetterQueue';
import { mainQueue } from './queues/mainQueue';

dotenv.config();

const app: Express = express();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullMQAdapter(mainQueue as any),
    new BullMQAdapter(deadLetterQueue as any),
  ],
  serverAdapter: serverAdapter,
});

app.use(express.json());
app.use(morgan('dev'));
app.use('/admin/queues', serverAdapter.getRouter());

app.use('/api/v0/', router);

export default app;
