import { PokeApiPokemon, Pokemon, PokemonList } from '../types/types';

const formatPokemonData = (pokemonDetails: PokeApiPokemon[]): Pokemon[] => {
  return pokemonDetails.map((pokemon) => ({
    name: pokemon.name.replace(/-/g, ' '),
    image:
      pokemon.sprites.other.dream_world.front_default ||
      pokemon.sprites.other['official-artwork'].front_default ||
      pokemon.sprites.front_default,
    types: pokemon.types.map(({ type }) => type.name),
    order: pokemon.order,
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name.replace(/-/g, ' '),
      base: stat.base_stat,
    })),
  }));
};

const formatPokemonNames = (pokemonList: PokemonList) => {
  return pokemonList.map((pokemon) => pokemon.name.replace(/-/g, ' '));
};

export { formatPokemonData, formatPokemonNames };
