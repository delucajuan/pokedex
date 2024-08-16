import {
  GetAllPokemonProps,
  PokeApiPokemonList,
  PokeApiPokemon,
  PokeApiTypes,
  PokemonUrlList,
} from '../types/types';
import { formatPokemonData } from '../utils/formatPokemonData';
import { handleAxiosError } from '../utils/errorHandler';
import axiosInstance from '../config/axiosConfig';
import { getPokemonCache, loadPokemonCache } from '../utils/cache';

const getAllpokemon = async ({ page, limit, type, name }: GetAllPokemonProps) => {
  const offset = limit !== undefined ? (page - 1) * limit : 0;
  let filteredPokemon: PokemonUrlList = [];
  let total = 0;

  try {
    if (!type && !name) {
      // If no filters are applied, fetch all Pokémon
      const pokemonData = (
        await axiosInstance.get<PokeApiPokemonList>(`/pokemon?limit=${limit}&offset=${offset}`)
      ).data;
      filteredPokemon = pokemonData.results;
      total = pokemonData.count;
    } else {
      // Filter by type
      if (type) {
        const pokemonByType = (await axiosInstance.get<PokeApiTypes>(`/type/${type}`)).data.pokemon;

        if (!pokemonByType?.length) {
          return { data: [], total };
        }

        // Map the Pokémon by type to a PokemonUrlList format
        filteredPokemon = pokemonByType.map(({ pokemon }) => ({
          name: pokemon.name,
          url: pokemon.url,
        }));
        total = pokemonByType.length;
      }

      // Filter by name
      if (name) {
        // If only the name filter is applied, use the cached Pokémon
        if (!type) {
          let pokemonCache = getPokemonCache();
          if (!pokemonCache.length) {
            await loadPokemonCache();
            pokemonCache = getPokemonCache();
          }
          filteredPokemon = pokemonCache;
        }

        // Filter Pokémon by name using a regex
        const nameRegex = new RegExp(name.toLowerCase(), 'i');
        filteredPokemon = filteredPokemon?.filter((pokemon) => nameRegex.test(pokemon.name));
        total = filteredPokemon.length;
      }
      filteredPokemon.splice(offset, offset + limit);
    }
    if (!filteredPokemon.length) {
      return { data: [], total };
    }

    // Get data for filtered and paginated pokemon
    const pokemonData = await Promise.all(
      filteredPokemon.map(
        async (pokemon) => (await axiosInstance.get<PokeApiPokemon>(pokemon.url)).data
      )
    );

    const formattedData = formatPokemonData(pokemonData);

    return { data: formattedData, total };
  } catch (error) {
    handleAxiosError(error);
  }
};

export default { getAllpokemon };
