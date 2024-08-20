'use client';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { formatPokemonName } from '@/utils/textFormatters';
import { Pokemon } from '@/types/types';
import { useRouter } from 'next/navigation';
import TypesChips from './TypesChips';
import StatsRating from './StatsRating';

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const router = useRouter();
  const handlePokemonClick = () => {
    router.push(`/${pokemon.name}`);
  };
  return (
    <Grid item>
      <Card variant="elevation" sx={{ width: 276, borderRadius: 5 }}>
        <CardActionArea sx={{ padding: 2, height: 490 }} onClick={handlePokemonClick}>
          <CardMedia
            component="img"
            height="154"
            image={pokemon.image || '/images/fallbackPokemon.webp'}
            alt={pokemon.name}
            sx={{ objectFit: 'contain' }}
          />
          <CardContent
            sx={{
              height: 284,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box marginY="auto">
              <Typography variant="body2" color="text.secondary">
                {pokemon.order > 0 && `#${pokemon.order}`}
              </Typography>
              <Typography variant="h5" component="div">
                {formatPokemonName(pokemon.name)}
              </Typography>
            </Box>
            <Box>
              <TypesChips types={pokemon.types} />
              <StatsRating stats={pokemon.stats} />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
