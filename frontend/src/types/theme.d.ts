import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    normal?: createPalette.PaletteColorOptions;
    fighting?: createPalette.PaletteColorOptions;
    flying?: createPalette.PaletteColorOptions;
    poison?: createPalette.PaletteColorOptions;
    ground?: createPalette.PaletteColorOptions;
    rock?: createPalette.PaletteColorOptions;
    bug?: createPalette.PaletteColorOptions;
    ghost?: createPalette.PaletteColorOptions;
    steel?: createPalette.PaletteColorOptions;
    fire?: createPalette.PaletteColorOptions;
    water?: createPalette.PaletteColorOptions;
    grass?: createPalette.PaletteColorOptions;
    electric?: createPalette.PaletteColorOptions;
    psychic?: createPalette.PaletteColorOptions;
    ice?: createPalette.PaletteColorOptions;
    dragon?: createPalette.PaletteColorOptions;
    dark?: createPalette.PaletteColorOptions;
    fairy?: createPalette.PaletteColorOptions;
    stellar?: createPalette.PaletteColorOptions;
    unknown?: createPalette.PaletteColorOptions;
    shadow?: createPalette.PaletteColorOptions;
  }
  interface Palette {
    normal: createPalette.PaletteColor;
    fighting: createPalette.PaletteColor;
    flying: createPalette.PaletteColor;
    poison: createPalette.PaletteColor;
    ground: createPalette.PaletteColor;
    rock: createPalette.PaletteColor;
    bug: createPalette.PaletteColor;
    ghost: createPalette.PaletteColor;
    steel: createPalette.PaletteColor;
    fire: createPalette.PaletteColor;
    water: createPalette.PaletteColor;
    grass: createPalette.PaletteColor;
    electric: createPalette.PaletteColor;
    psychic: createPalette.PaletteColor;
    ice: createPalette.PaletteColor;
    dragon: createPalette.PaletteColor;
    dark: createPalette.PaletteColor;
    fairy: createPalette.PaletteColor;
    stellar: createPalette.PaletteColor;
    unknown: createPalette.PaletteColor;
    shadow: createPalette.PaletteColor;
  }
}

declare module '@mui/material' {
  interface ChipPropsColorOverrides {
    normal: true;
    fighting: true;
    flying: true;
    poison: true;
    ground: true;
    rock: true;
    bug: true;
    ghost: true;
    steel: true;
    fire: true;
    water: true;
    grass: true;
    electric: true;
    psychic: true;
    ice: true;
    dragon: true;
    dark: true;
    fairy: true;
    stellar: true;
    unknown: true;
    shadow: true;
  }
}
