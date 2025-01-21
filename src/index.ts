import mongoose from 'mongoose';
import app from './app';
import './workers/mainQueueWorker';
import './workers/deadLetterQueueWorker';
import { logState } from './utils';

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI as string, {})
  .then((data) => console.log('Connected to MongoDB'))
  .catch((err) => console.error(`Failed to connect to MongoDB: ${err}`));

setInterval(logState, 7000);

app.listen(PORT, () => {
  console.log(`[server] express running on http://localhost:${PORT}`);
});
