import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import { ExpressAdapter } from '@bull-board/express';
import { deadLetterQueue } from './queues/deadLetterQueue';
import { mainQueue } from './queues/mainQueue';

export const bullMQExpressAdapter = new ExpressAdapter();
bullMQExpressAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullMQAdapter(mainQueue),
    new BullMQAdapter(deadLetterQueue),
  ],
  serverAdapter: bullMQExpressAdapter,
});
