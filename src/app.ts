import dotenv from 'dotenv';
import express, { Express } from 'express';
import router from './routes';
import morgan from 'morgan';
import { bullMQExpressAdapter } from './dashboard';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/admin/queues', bullMQExpressAdapter.getRouter());

app.use('/api/v0/', router);

export default app;
