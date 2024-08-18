'use client';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { capitalizeFirstLetter, formatPokemonName } from '@/utils/textFormatters';
import { Pokemon, PokemonType } from '@/types/types';
import { Fragment } from 'react';
import PokeballIcon from './PokeballIcon';

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Grid item>
      <Card variant="elevation" sx={{ width: 276, borderRadius: 5 }}>
        <CardActionArea sx={{ padding: 2, height: 490 }}>
          <CardMedia
            component="img"
            height="154"
            image={pokemon.image || '/images/fallbackPokemon.webp'}
            alt={pokemon.name}
            sx={{ objectFit: 'contain', opacity: pokemon.image ? 'unset' : 0.3 }}
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
              <Stack direction="row" spacing={1}>
                {pokemon.types.map((type) => (
                  <Chip
                    key={type}
                    label={capitalizeFirstLetter(type)}
                    color={type as PokemonType}
                    size="small"
                    sx={{
                      width: '50%',
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>
              <Stack spacing={0.5} paddingTop={2}>
                {pokemon.stats.map((stat, index) => (
                  <Fragment key={stat.name}>
                    {index !== 0 && <Divider />}
                    <Stack
                      direction="row"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography component="legend" variant="body2">
                        {capitalizeFirstLetter(stat.name)}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={(stat.base / 200) * 5}
                        readOnly
                        icon={<PokeballIcon fontSize="1.3rem" />}
                        emptyIcon={
                          <PokeballIcon variant="outlined" fontSize="1.3rem" opacity={0.2} />
                        }
                      />
                    </Stack>
                  </Fragment>
                ))}
              </Stack>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
