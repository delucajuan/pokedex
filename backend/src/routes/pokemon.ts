import { Router } from 'express';
import apicache from 'apicache';
import {
  handleValidationErrors,
  validateAllowedParams,
  validatePokemon,
  validatePokemonByName,
  validatePokemonSearch,
} from '../middlewares/validator';
import pokemonController from '../controllers/pokemon';

const router = Router();
const cache = apicache.options({
  statusCodes: {
    include: [200],
  },
}).middleware;

/**
 * @swagger
 * /api/pokemon:
 *   get:
 *     summary: Get all Pokémon
 *     description: Retrieve a list of Pokémon with pagination.
 *     tags:
 *       - Pokémon Endpoints
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of Pokémon to return.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number to retrieve.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter Pokémon by type.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter Pokémon by name.
 *     responses:
 *       200:
 *         description: A list of Pokémon with pagination.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/PokemonListResponse'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/',
  cache('12 hours'),
  validateAllowedParams(['limit', 'page', 'type', 'name']),
  validatePokemon,
  handleValidationErrors,
  pokemonController.getAllPokemon
);

/**
 * @swagger
 * /api/pokemon/names:
 *   get:
 *     summary: Get Pokémon names
 *     description: Retrieve a list of Pokémon names based on a search query.
 *     tags:
 *       - Pokémon Endpoints
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for Pokémon names.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of Pokémon names to return.
 *     responses:
 *       200:
 *         description: A list of Pokémon names.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PokemonNamesResponse'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/names',
  cache('12 hours'),
  validateAllowedParams(['search', 'limit']),
  validatePokemonSearch,
  handleValidationErrors,
  pokemonController.getPokemonNames
);

/**
 * @swagger
 * /api/pokemon/types:
 *   get:
 *     summary: Get Pokémon types
 *     description: Retrieve a list of all Pokémon types.
 *     tags:
 *       - Pokémon Endpoints
 *     responses:
 *       200:
 *         description: A list of Pokémon types.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PokemonTypesResponse'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.get('/types', cache('12 hours'), pokemonController.getPokemonTypes);

/**
 * @swagger
 * /api/pokemon/name/{name}:
 *   get:
 *     summary: Get Pokémon details by name
 *     description: Retrieve detailed information about a specific Pokémon by name.
 *     tags:
 *       - Pokémon Endpoints
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the Pokémon to retrieve.
 *     responses:
 *       200:
 *         description: Detailed information about a Pokémon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PokemonDetailResponse'
 *       404:
 *         description: Pokémon not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/name/:name',
  cache('12 hours'),
  validatePokemonByName,
  pokemonController.getPokemonByName
);

export default router;
