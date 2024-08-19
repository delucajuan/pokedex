import {
  formatPokemonDetailsProps,
  PokeApiPokemon,
  Pokemon,
  PokemonDetail,
  PokemonList,
  TypesList,
} from '../types/types';

const formatPokemonData = (pokemonList: PokeApiPokemon[]): Pokemon[] =>
  pokemonList.map((pokemon) => ({
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

const formatPokemonDetails = (pokemon: formatPokemonDetailsProps): PokemonDetail => ({
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
  height: pokemon.height,
  weight: pokemon.weight,
  abilities: pokemon.abilitiesDetails.map((ability) => ({
    name: ability.name,
    description:
      ability.effect_entries.find((effect) => effect.language.name === 'en')?.effect || '',
  })),
});

const formatPokemonNames = (pokemonList: PokemonList) =>
  pokemonList.map((pokemon) => pokemon.name.replace(/-/g, ' '));

const formatPokemonTypes = (typesList: TypesList) =>
  typesList.map((type) => type.name.replace(/-/g, ' '));

export { formatPokemonData, formatPokemonNames, formatPokemonTypes, formatPokemonDetails };
