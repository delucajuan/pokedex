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
  cache('12 hours'),
  validateAllowedParams(['limit', 'page', 'type', 'name']),
  validatePokemon,
  handleValidationErrors,
  pokemonController.getAllPokemon
);

// Get Pokémon names
router.get(
  '/names',
  cache('12 hours'),
  validateAllowedParams(['search', 'limit']),
  validatePokemonSearch,
  handleValidationErrors,
  pokemonController.getPokemonNames
);

// Get Pokémon types
router.get('/types', cache('12 hours'), handleValidationErrors, pokemonController.getPokemonTypes);

// TODO: Get Pokémon by id
router.get('/name/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  res.send(`Get Pokémon with ID: ${name}`);
});

export default router;
