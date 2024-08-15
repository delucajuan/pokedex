// src/routes/index.ts
import { Router } from 'express';
import pokemonRoutes from './pokemon';

const router = Router();

router.use('/pokemon', pokemonRoutes);

export default router;
