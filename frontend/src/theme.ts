import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { PaletteMode, Theme } from '@mui/material';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          primary: {
            main: '#1976d2',
          },
          background: {
            default: '#ffffff',
          },
        }
      : {
          // Dark mode palette
          primary: {
            main: '#90caf9',
          },
          background: {
            default: '#121212',
          },
        }),
  },
});

export const getTheme = (mode: PaletteMode): Theme =>
  createTheme(getDesignTokens(mode));
