import { Router, Request, Response } from 'express';
import apicache from 'apicache';
import {
  handleValidationErrors,
  validateAllowedParams,
  validatePokemon,
  validatePokemonSearch,
} from '../middlewares/validator';
import pokemonController from '../controllers/pokemon';

const router = Router();
const cache = apicache.options({
  statusCodes: {
    include: [200],
  },
}).middleware;

// Get all Pokémon
router.get(
  '/',
  cache('60 minutes'),
  validateAllowedParams(['limit', 'page', 'type', 'name']),
  validatePokemon,
  handleValidationErrors,
  pokemonController.getAllPokemon
);

// Get Pokémon names
router.get(
  '/names',
  cache('60 minutes'),
  validateAllowedParams(['search', 'limit']),
  validatePokemonSearch,
  handleValidationErrors,
  pokemonController.getPokemonNames
);

// TODO: Get Pokémon by id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Get Pokémon with ID: ${id}`);
});

export default router;
