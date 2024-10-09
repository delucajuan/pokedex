import {
  GetAllPokemonProps,
  PokeApiPokemonList,
  PokeApiPokemon,
  PokeApiTypes,
  PokemonUrlList,
  getPokemonNamesProps,
  PokeApiAbility,
  EvolutionChain,
} from '../types/types';
import {
  formatPokemonData,
  formatPokemonDetails,
  formatPokemonNames,
  formatPokemonTypes,
} from '../utils/formatters';
import { handleAxiosError } from '../utils/errorHandler';
import axiosInstance from '../config/axiosConfig';
import { getPokemonCache, loadPokemonCache } from '../utils/cache';
import { filterAndSortPokemon } from '../utils/filters';
import { AxiosError } from 'axios';

const getAllpokemon = async ({ page, limit, type, name }: GetAllPokemonProps) => {
  const offset = (page - 1) * limit;
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
        // Transform spaces in the search term to hyphens
        const formattedName = name.toLowerCase().replace(/\s+/g, '-');

        // If only the name filter is applied, use the cached Pokémon
        if (!type) {
          let pokemonCache = getPokemonCache();
          if (!pokemonCache.length) {
            await loadPokemonCache();
            pokemonCache = getPokemonCache();
          }
          filteredPokemon = pokemonCache;
        }

        // Filter and sort Pokémon by relevance
        filteredPokemon = filterAndSortPokemon(filteredPokemon, formattedName) as PokemonUrlList;
        total = filteredPokemon.length;
      }
      // Get current page data
      filteredPokemon = filteredPokemon.slice(offset, offset + limit);
    }
    if (!filteredPokemon.length) {
      return { data: [], total };
    }

    // Get data for filtered and paginated Pokémon
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

const getPokemonNames = async ({ searchValue, limit }: getPokemonNamesProps) => {
  let pokemonCache = getPokemonCache();
  if (!pokemonCache.length) {
    await loadPokemonCache();
    pokemonCache = getPokemonCache();
  }
  // Transform spaces in the search term to hyphens
  const formattedSearchValue = searchValue.toLowerCase().replace(/\s+/g, '-');
  // Filter and sort Pokémon by relevance
  const filteredNames = filterAndSortPokemon(pokemonCache, formattedSearchValue).slice(0, limit);
  return formatPokemonNames(filteredNames);
};

const getPokemonTypes = async () => {
  let nextUrl = `/type?limit=100`;
  const allTypes: PokemonUrlList = [];

  while (nextUrl) {
    const typesData = (await axiosInstance.get<PokeApiPokemonList>(nextUrl)).data;
    allTypes.push(...typesData.results);
    nextUrl = typesData.next || '';
  }
  return formatPokemonTypes(allTypes);
};

const getPokemonByName = async (name: string) => {
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  // Get the basic Pokémon data
  const pokemonData = (await axiosInstance.get<PokeApiPokemon>(`/pokemon/${formattedName}`)).data;

  const abilities = pokemonData.abilities.filter((abilityInfo) => !abilityInfo.is_hidden);

  // Get details for the abilities
  const abilitiesDetails = await Promise.all(
    abilities.map(async (abilityInfo) => {
      const abilityData = (await axiosInstance.get<PokeApiAbility>(abilityInfo.ability.url)).data;
      return abilityData;
    })
  );

  let evolutionChain;
  try {
    // Fetch the species data to get the evolution chain URL
    const speciesData = (
      await axiosInstance.get<{ evolution_chain: { url: string } }>(
        `/pokemon-species/${formattedName}/`
      )
    ).data;

    // Get the evolution chain using the URL from the species data
    evolutionChain = (await axiosInstance.get<EvolutionChain>(speciesData.evolution_chain.url))
      .data;
  } catch (err) {
    // Do not throw error if not evolution data for current Pókemon
    const error = err as AxiosError;
    if (error.response?.status !== 404) {
      throw error;
    }
  }

  return formatPokemonDetails({
    ...pokemonData,
    abilitiesDetails,
    evolutionChain,
  });
};

export default { getAllpokemon, getPokemonNames, getPokemonTypes, getPokemonByName };
