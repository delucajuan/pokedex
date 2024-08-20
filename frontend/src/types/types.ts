import { ListProps, PaletteMode, StackProps } from '@mui/material';

export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'stellar'
  | 'unknown'
  | 'shadow';

export type Pokemon = {
  name: string;
  image: string;
  types: PokemonType[];
  order: number;
  stats: Stat[];
};

export type Stat = {
  name: string;
  base: number;
};

export type PokemonDetail = Pokemon & {
  height: number;
  weight: number;
  baseExperience: number;
  abilities: {
    name: string;
    description: string;
  }[];
  evolutionChain: string[];
};

export type Metadata = {
  currentPage: number;
  pageSize: number;
  pages: number;
  total: number;
};

export type AllPokemonResponse = {
  metadata: Metadata;
  data: Pokemon[];
};

export type CustomPaginationProps = {
  totalPages: number;
  currentPage: number;
};

export type ThemeContextType = {
  mode: PaletteMode;
  toggleTheme: () => void;
};

export type TypesMenuOptions = PokemonType | 'all';

export type TypesChipsProps = StackProps & {
  types?: PokemonType[];
};

export type SpecsListProps = ListProps & {
  pokemon?: PokemonDetail;
};

export type StatsRatingProps = StackProps & {
  stats?: Stat[];
  size?: number;
};

export type EvolutionsProps = {
  pokemon?: PokemonDetail;
};

export type FetchError = Error & {
  status?: number;
  statusText?: string;
};
