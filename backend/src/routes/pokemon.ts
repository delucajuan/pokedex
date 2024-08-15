import { Router, Request, Response } from 'express';
import apicache from 'apicache';
import {
  handleValidationErrors,
  validateAllowedParams,
  validatePokemonQuery,
} from '../middlewares/validator';
import { getAllPokemon } from '../controllers/pokemon';

const router = Router();
const cache = apicache.middleware;

// Get all pokemon
router.get(
  '/',
  cache('60 minutes'),
  validateAllowedParams(['limit', 'page', 'type', 'name']),
  validatePokemonQuery,
  handleValidationErrors,
  getAllPokemon
);

// TODO: Get pokemon by id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Get Pokémon with ID: ${id}`);
});

export default router;
