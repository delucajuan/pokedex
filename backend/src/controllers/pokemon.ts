import { Request, Response, NextFunction } from 'express';
import pokemonService from '../services/pokemon';
import { HttpError } from '../types/types';
import { AxiosError } from 'axios';

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
      return next(err);
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

const getPokemonTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemonTypes = await pokemonService.getPokemonTypes();
    res.json(pokemonTypes);
  } catch (err) {
    next(err);
  }
};

const getPokemonByName = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  try {
    const pokemonData = await pokemonService.getPokemonByName(name);
    res.json(pokemonData);
  } catch (err) {
    const error = err as AxiosError;

    if (error.response?.status === 404) {
      const notFoundError: HttpError = new Error('Pokémon not found');
      notFoundError.status = 404;
      return next(notFoundError);
    }
    next(error);
  }
};

export default { getAllPokemon, getPokemonNames, getPokemonTypes, getPokemonByName };
