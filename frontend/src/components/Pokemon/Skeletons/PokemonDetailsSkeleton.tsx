'use client';
import {
  Paper,
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Skeleton,
} from '@mui/material';
import Evolutions from '../Evolutions';
import SpecsList from '../SpecsList';
import StatsRating from '../StatsRating';
import TypesChips from '../TypesChips';

function PokemonDetailsSkeleton() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Paper sx={{ borderRadius: '10px', marginY: 2, padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Pokémon name */}
        <Grid item container justifyContent="center" alignItems="baseline">
          <Skeleton sx={{ marginX: 1 }}>
            <Typography variant={isXs ? 'h4' : 'h3'} marginX={1} textAlign="center">
              #10 Charmander
            </Typography>
          </Skeleton>
        </Grid>
        {/* Types chips */}
        <Box justifyContent="center" width={244} paddingY={1}>
          <TypesChips justifyContent="center" />
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
            <Skeleton
              variant="rounded"
              width="100%"
              sx={{
                height: { xs: 350, md: 425 },
                maxWidth: 440,
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
              <Skeleton>
                <Typography variant="h5">Statistics</Typography>
              </Skeleton>
              <StatsRating size={isXs ? 1.1 : 1.2} />
            </Grid>
            {/* Other characteristics */}

            <Grid item container justifyContent="center">
              <Skeleton>
                <Typography variant="h5">Characteristics</Typography>
              </Skeleton>
              <SpecsList />
            </Grid>
          </Grid>
        </Grid>
        <Evolutions />
      </Grid>
    </Paper>
  );
}
export default PokemonDetailsSkeleton;
