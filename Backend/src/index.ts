import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import { Log } from '../../LoggingMiddleware/src/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  Log('backend', 'info', 'middleware', `${req.method} request to ${req.path}`);
  next();
});

app.use('/api', routes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  Log('backend', 'error', 'middleware', `Error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  Log('backend', 'info', 'service', `Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});

export default app;