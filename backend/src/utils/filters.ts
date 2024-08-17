import { PokemonList } from '../types/types';

// Sort Pokémon by name relevance
const calculateRelevance = (pokemonName: string, searchValue: string): number => {
  const lowerName = pokemonName.toLowerCase();
  const lowerSearch = searchValue.toLowerCase();
  const matchIndex = lowerName.indexOf(lowerSearch);

  if (lowerName === lowerSearch) {
    return 3; // Highest score for exact match
  } else if (matchIndex === 0) {
    return 2; // High score if match is at the start
  } else if (matchIndex > 0) {
    return 1; // Lower score for match elsewhere
  } else {
    return 0; // No match
  }
};

// Filter Pokémon by name
const filterAndSortPokemon = (pokemonList: PokemonList, searchValue: string) => {
  if (!searchValue) return pokemonList;
  const nameRegex = new RegExp(searchValue, 'i');

  return pokemonList
    .filter((pokemon) => nameRegex.test(pokemon.name))
    .map((pokemon) => ({
      ...pokemon,
      relevance: calculateRelevance(pokemon.name, searchValue),
    }))
    .sort((a, b) => b.relevance - a.relevance);
};

export { filterAndSortPokemon };
