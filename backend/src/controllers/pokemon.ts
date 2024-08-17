import { Request, Response, NextFunction } from 'express';
import pokemonService from '../services/pokemon';
import { HttpError } from '../types/types';

const getAllPokemon = async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const name = req.query.name as string | undefined;
  const type = req.query.type as string | undefined;

  try {
    const pokemonData = (await pokemonService.getAllpokemon({
      page,
      limit,
      name,
      type,
    })) || { data: [], total: 0 };

    const pages = pokemonData.total > 0 ? Math.ceil(pokemonData.total / limit) : 1;

    // Page is greater than total pages
    if (page > pages) {
      const err: HttpError = new Error('Page out of bounds');
      err.status = 400;
      throw err;
    }

    // Format response
    const response = {
      metadata: {
        total: pokemonData.total,
        pages,
        currentPage: page,
        pageSize: limit,
      },
      data: pokemonData.data,
    };

    // Fetch and return the formatted Pokémon data
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const getPokemonNames = async (req: Request, res: Response, next: NextFunction) => {
  const searchValue = req.query.search as string;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  try {
    const pokemonData =
      (await pokemonService.getPokemonNames({
        searchValue,
        limit,
      })) || [];

    // Fetch and return the formatted Pokémon data
    res.json(pokemonData);
  } catch (err) {
    next(err);
  }
};

export default { getAllPokemon, getPokemonNames };
