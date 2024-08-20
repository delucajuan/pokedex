'use client';
import Error from '@/components/Error';
import SpecsList from '@/components/Pokemon/SpecsList';
import StatsRating from '@/components/Pokemon/StatsRating';
import TypesChips from '@/components/Pokemon/TypesChips';
import usePokemonDetails from '@/hooks/usePokemonDetails';
import { formatPokemonName } from '@/utils/textFormatters';
import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import Evolutions from '@/components/Pokemon/Evolutions';
import { usePageTitle } from '@/hooks/usePageTitle';
import PokemonDetailsSkeleton from '@/components/Pokemon/Skeletons/PokemonDetailsSkeleton';

function PokemonDetails() {
  const params = useParams();
  const nameParam = Array.isArray(params.name) ? params.name[0] : params.name;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const { data: pokemon, isLoading, error } = usePokemonDetails(nameParam);

  // Add Pokémon name to page title
  const pageTitle = pokemon ? formatPokemonName(pokemon.name) : '';
  usePageTitle(pageTitle);

  if (isLoading) {
    return <PokemonDetailsSkeleton />;
  }
  if (error || !pokemon) {
    return <Error errorType={error.status === 404 ? 'notFound' : 'server'} />;
  }
  const {
    name,
    image,
    types,
    order,
    stats,
    height,
    weight,
    baseExperience,
    abilities,
    evolutionChain,
  } = pokemon;
  const renderCharacteristics = height || weight || baseExperience || abilities[0].name;

  return (
    <Paper sx={{ borderRadius: '10px', marginY: 2, padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Pokémon name */}
        <Grid item container justifyContent="center" alignItems="baseline">
          {order > 0 && (
            <Typography
              variant={isXs ? 'h4' : 'h3'}
              sx={{ opacity: 0.5 }}
              marginX={1}
              textAlign="center"
            >
              #{order}
            </Typography>
          )}
          <Typography
            variant={isXs ? 'h4' : 'h3'}
            marginX={1}
            overflow="hidden"
            textOverflow="ellipsis"
            textAlign="center"
          >
            {formatPokemonName(name)}
          </Typography>
        </Grid>
        {/* Types chips */}
        <Box justifyContent="center" width={244} paddingY={1}>
          <TypesChips types={types} justifyContent="center" />
        </Box>
        <Grid container item justifyContent="space-around" spacing={2}>
          {/* Image container */}
          <Grid
            item
            container
            xs={12}
            md={5}
            padding={2}
            justifyContent="center"
            alignContent="flex-start"
          >
            <Box
              component="img"
              src={image || '/images/fallbackPokemon.webp'}
              width="100%"
              sx={{
                maxHeight: { xs: 350, md: 450 },
                objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid
            item
            container
            sx={{ maxWidth: '500px !important' }}
            xs={12}
            md={6}
            lg={5}
            alignContent="flex-start"
            spacing={4}
          >
            {/* Stats */}
            <Grid item container justifyContent="center">
              <Typography variant="h5">Statistics</Typography>
              <StatsRating stats={stats} size={isXs ? 1.1 : 1.2} />
            </Grid>
            {/* Other characteristics */}
            {renderCharacteristics && (
              <Grid item container justifyContent="center">
                <Typography variant="h5">Characteristics</Typography>
                <SpecsList pokemon={pokemon} />
              </Grid>
            )}
          </Grid>
        </Grid>
        {evolutionChain?.length > 1 && <Evolutions pokemon={pokemon} />}
      </Grid>
    </Paper>
  );
}
export default PokemonDetails;
