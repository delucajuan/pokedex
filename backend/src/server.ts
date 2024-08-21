import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import errorsMiddleware from './middlewares/errors';
import routes from './routes';
import { HttpError } from './types/types';
import { loadPokemonCache } from './utils/cache';
import setupSwaggerDocs from './config/swagger';

const PORT = process.env.PORT || 5001;
const app = express();
app.use(cors());

// Load Pokémon cache at server startup
loadPokemonCache();

// Set an interval to refresh the cache
setInterval(loadPokemonCache, 12 * 60 * 60 * 1000); // 12 hours

app.use('/api', routes);

// Swagger Docs
setupSwaggerDocs(app);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: HttpError = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.log(`✅ | Server is running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
