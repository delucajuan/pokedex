import { Box, Link, Typography } from '@mui/material';

function Footer() {
  return (
    <Box display="flex" justifyContent="center" paddingBottom={2} paddingX={2}>
      <Typography textAlign="center" variant="subtitle2" color="textSecondary">
        Created by{' '}
        <Link
          href="https://github.com/delucajuan"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          Juan De Luca
        </Link>{' '}
        | Pokémon data sourced from{' '}
        <Link href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" underline="hover">
          PokéApi
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
