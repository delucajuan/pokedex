import {
  EvolutionChainLink,
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

const extractEvolutionChain = (
  chainLink: EvolutionChainLink,
  currentPokemonName: string
): string[] => {
  const allPaths: string[][] = [];
  const target = currentPokemonName.toLowerCase();

  // Helper function to collect all possible evolution paths
  const collectPaths = (link: EvolutionChainLink, currentPath: string[]): void => {
    // Add the current species to the path
    currentPath.push(link.species.name.replace(/-/g, ' '));

    if (link.evolves_to.length === 0) {
      // Leaf node, push the current path
      allPaths.push([...currentPath]);
    } else {
      // Traverse each evolution branch
      for (const evolvesToLink of link.evolves_to) {
        collectPaths(evolvesToLink, currentPath);
      }
    }

    // Backtrack to explore other branches
    currentPath.pop();
  };

  // Initiate the collection of all paths
  collectPaths(chainLink, []);

  // If the selected Pokémon is the base form, return the first path
  if (chainLink.species.name.toLowerCase() === target) {
    return allPaths.length > 0 ? allPaths[0] : [chainLink.species.name.replace(/-/g, ' ')];
  }

  // Otherwise, find the path that includes the selected Pokémon
  for (const path of allPaths) {
    const lowerCasePath = path.map((name) => name.toLowerCase());

    if (lowerCasePath.includes(target)) {
      // Return the entire evolution path that includes the target Pokémon
      return path;
    }
  }

  return [];
};

const formatPokemonDetails = (pokemon: formatPokemonDetailsProps): PokemonDetail => ({
  name: pokemon.name.replace(/-/g, ' '),
  image:
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default,
  types: pokemon.types.map(({ type }) => type.name),
  order: pokemon.order,
  stats: pokemon.stats.map((stat) => ({
    name: stat.stat.name?.replace(/-/g, ' '),
    base: stat.base_stat,
  })),
  height: pokemon.height,
  weight: pokemon.weight,
  baseExperience: pokemon.base_experience,
  abilities: pokemon.abilitiesDetails.map((ability) => ({
    name: ability.name?.replace(/-/g, ' '),
    description:
      ability.effect_entries.find((effect) => effect.language.name === 'en')?.effect || '',
  })),
  evolutionChain: pokemon.evolutionChain
    ? extractEvolutionChain(pokemon.evolutionChain.chain, pokemon.name)
    : [],
});

const formatPokemonNames = (pokemonList: PokemonList) =>
  pokemonList.map((pokemon) => pokemon.name.replace(/-/g, ' '));

const formatPokemonTypes = (typesList: TypesList) => {
  // Exlude types without Pokémon data
  const excludedTypes = ['stellar', 'unknown', 'shadow'];
  return typesList
    .filter((type) => !excludedTypes.includes(type.name))
    .map((type) => type.name.replace(/-/g, ' '));
};

export { formatPokemonData, formatPokemonNames, formatPokemonTypes, formatPokemonDetails };
