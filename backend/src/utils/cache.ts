import axios from 'axios';
import { PokeApiPokemonList, PokemonCache } from '../types/types';

const pokeApiUrl = process.env.POKEAPI_URL;
let pokemonCache: PokemonCache = [];

// Cache for storing Pokemon names and urls
const loadPokemonCache = async () => {
  try {
    let url = `${pokeApiUrl}/pokemon?limit=100&offset=0`;

    let nextUrl = url;
    const allPokemon: PokemonCache = [];

    while (nextUrl) {
      const response = await axios.get<PokeApiPokemonList>(nextUrl);
      const pokemonPage = response.data.results.map((pokemon) => ({
        name: pokemon.name,
        url: pokemon.url,
      }));
      allPokemon.push(...pokemonPage);
      nextUrl = response.data.next || '';
    }
    pokemonCache = allPokemon;
    console.log('💾 | Cache loaded:', pokemonCache.length, 'Pokémon');
  } catch (error) {
    console.error('Failed to load Pokémon cache', error);
  }
};

const getPokemonCache = () => pokemonCache;

export { loadPokemonCache, getPokemonCache };
