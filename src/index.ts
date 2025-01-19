import mongoose from 'mongoose';
import app from './app';
import './workers/eventWorker';
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI as string, {})
  .then((data) => console.log('Connected to MongoDB'))
  .catch((err) => console.error(`Failed to connect to MongoDB: ${err}`));

app.listen(PORT, () => {
  console.log(`[server] express running on http://localhost:${PORT}`);
});
