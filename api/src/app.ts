import express, { Request, Response } from 'express';
import cors from 'cors';
import appRouters from './routes/app.route';
import apiRouters from './routes/api.route';
import requestLogger from './middleware/request-logger.middleware';
import auth from './middleware/auth.middleware';
import { initAssociations } from './models/associations';
initAssociations();

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(auth);

app.use('/', appRouters);
app.use('/api', apiRouters);

export default app;