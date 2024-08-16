import { PokeApiPokemon, Pokemon } from "../types/types";

export const formatPokemonData = (pokemonDetails: PokeApiPokemon[]): Pokemon[] => {
  return pokemonDetails.map((pokemon) => ({
    name: pokemon.name,
    image:
      pokemon.sprites.other.dream_world.front_default ||
      pokemon.sprites.other["official-artwork"].front_default ||
      pokemon.sprites.front_default,
    types: pokemon.types.map(({ type }) => type.name),
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name,
      base: stat.base_stat,
    })),
  }));
};
