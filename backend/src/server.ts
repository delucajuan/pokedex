import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import errorsMiddleware from './middlewares/errors';
import routes from './routes';
import { HttpError } from './types/types';
import { loadPokemonCache } from './utils/cache';

const app = express();
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());

// Load Pokemon cache at server startup
loadPokemonCache();

// Set an interval to refresh the cache
setInterval(loadPokemonCache, 12 * 60 * 60 * 1000); // 12 hours

app.use('/api', routes);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: HttpError = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(errorsMiddleware);

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
