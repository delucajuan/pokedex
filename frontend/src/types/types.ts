import { PaletteMode } from '@mui/material';

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
  stats: {
    name: string;
    base: number;
  }[];
};

export type PokemonDetail = Pokemon & {
  height: number;
  weight: number;
  abilities: {
    name: string;
    description: string;
  }[];
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

export type PokemonNamesResponse = string[];

export type ThemeContextType = {
  mode: PaletteMode;
  toggleTheme: () => void;
};
