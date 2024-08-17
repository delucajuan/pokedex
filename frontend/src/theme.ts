import { createTheme } from '@mui/material/styles';
import { PaletteMode, Theme } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => {
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode palette
            primary: {
              main: '#D14526', //'#1976d2', #4161A7
            },
            secondary: {
              main: '#4161A7', //'#D14526',
            },
            background: {
              default: '#EFEFEF',
            },
          }
        : {
            // Dark mode palette
            primary: {
              main: '#DA6A51',
            },
            secondary: {
              main: '#6780B8',
            },
            background: {
              default: '#121212',
            },
          }),
    },
  });

  // Custom colors for Pokémon types
  theme = createTheme(theme, {
    palette: {
      normal: theme.palette.augmentColor({
        color: { main: '#757575' },
        name: 'normal',
      }),
      fighting: theme.palette.augmentColor({
        color: { main: '#C22E28' },
        name: 'fighting',
      }),
      flying: theme.palette.augmentColor({
        color: { main: '#A98FF3' },
        name: 'flying',
      }),
      poison: theme.palette.augmentColor({
        color: { main: '#A33EA1' },
        name: 'poison',
      }),
      ground: theme.palette.augmentColor({
        color: { main: '#E2BF65' },
        name: 'ground',
      }),
      rock: theme.palette.augmentColor({
        color: { main: '#B6A136' },
        name: 'rock',
      }),
      bug: theme.palette.augmentColor({
        color: { main: '#A6B91A' },
        name: 'bug',
      }),
      ghost: theme.palette.augmentColor({
        color: { main: '#735797' },
        name: 'ghost',
      }),
      steel: theme.palette.augmentColor({
        color: { main: '#B7B7CE' },
        name: 'steel',
      }),
      fire: theme.palette.augmentColor({
        color: { main: '#EE8130' },
        name: 'fire',
      }),
      water: theme.palette.augmentColor({
        color: { main: '#6390F0' },
        name: 'water',
      }),
      grass: theme.palette.augmentColor({
        color: { main: '#7AC74C' },
        name: 'grass',
      }),
      electric: theme.palette.augmentColor({
        color: { main: '#F7D02C' },
        name: 'electric',
      }),
      psychic: theme.palette.augmentColor({
        color: { main: '#F95587' },
        name: 'psychic',
      }),
      ice: theme.palette.augmentColor({
        color: { main: '#96D9D6' },
        name: 'ice',
      }),
      dragon: theme.palette.augmentColor({
        color: { main: '#6F35FC' },
        name: 'dragon',
      }),
      dark: theme.palette.augmentColor({
        color: { main: '#705746' },
        name: 'dark',
      }),
      fairy: theme.palette.augmentColor({
        color: { main: '#D685AD' },
        name: 'fairy',
      }),
      stellar: theme.palette.augmentColor({
        color: { main: '#8A7FAE' },
        name: 'stellar',
      }),
      unknown: theme.palette.augmentColor({
        color: { main: '#6C757D' },
        name: 'unknown',
      }),
      shadow: theme.palette.augmentColor({
        color: { main: '#403E3A' },
        name: 'shadow',
      }),
    },
  });

  return theme;
};

export const getTheme = (mode: PaletteMode): Theme => createTheme(getDesignTokens(mode));
