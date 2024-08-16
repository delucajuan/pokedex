import { PokeApiPokemonList, PokemonUrlList } from "../types/types";
import axiosInstance from "../config/axiosConfig";

let pokemonCache: PokemonUrlList = [];

// Cache for storing Pokemon names and urls
const loadPokemonCache = async () => {
  try {
    let url = `/pokemon?limit=100&offset=0`;

    let nextUrl = url;
    const allPokemon: PokemonUrlList = [];

    while (nextUrl) {
      const response = await axiosInstance.get<PokeApiPokemonList>(nextUrl);
      const pageData = response.data.results.map((pokemon) => ({
        name: pokemon.name,
        url: pokemon.url,
      }));
      allPokemon.push(...pageData);
      nextUrl = response.data.next || "";
    }
    pokemonCache = allPokemon;
    console.log("💾 | Cache loaded:", pokemonCache.length, "Pokémon");
  } catch (error) {
    console.error("Failed to load Pokémon cache", error);
  }
};

const getPokemonCache = () => pokemonCache;

export { loadPokemonCache, getPokemonCache };
