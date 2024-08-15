import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorsMiddleware from './middlewares/errors';
import routes from './routes';
import { HttpError } from './types/types';
import { loadPokemonCache } from './utils/cache';

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Load Pokemon cache at server startup
loadPokemonCache();

// Set an interval to refresh the cache
setInterval(loadPokemonCache, 60 * 60 * 1000); // 1 hour

app.use('/api', routes);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: HttpError = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
