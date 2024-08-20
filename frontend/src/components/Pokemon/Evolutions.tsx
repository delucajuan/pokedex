'use client';
import { EvolutionsProps } from '@/types/types';
import { Stack, Box, Skeleton, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useEvolutionChain from '@/hooks/useEvolutionChain';
import { formatPokemonName } from '@/utils/textFormatters';
import Link from 'next/link';

function Evolutions({ pokemon }: EvolutionsProps) {
  const { data: evolutionData, isLoading, error } = useEvolutionChain(pokemon?.evolutionChain);

  if (error) {
    return null;
  }

  if (isLoading) {
    return <Skeleton variant="circular" height={150} width={150} />;
  }
  return (
    <Grid container item justifyContent="center" width="100% ">
      <Typography variant="h5" gutterBottom>
        Evolutions
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        width="100%"
        justifyContent="center"
        alignItems="center"
        paddingY={2}
      >
        {evolutionData?.length > 1 &&
          evolutionData.map((evolution, index) => (
            <Fragment key={evolution.name}>
              <Link
                href={`/${evolution.name}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Stack justifyContent="space-between" height={150}>
                  <Box
                    component="img"
                    sx={{ objectFit: 'contain' }}
                    src={evolution.image}
                    maxHeight={118}
                    maxWidth={118}
                    flexGrow={1}
                  />
                  <Box>
                    <Typography textAlign="center" sx={{ verticalAlign: 'bottom' }}>
                      {formatPokemonName(evolution.name)}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
              {index !== evolutionData.length - 1 && (
                <ArrowForwardIcon
                  color="action"
                  sx={{ fontSize: '3rem', rotate: { xs: '90deg', sm: 'unset' } }}
                />
              )}
            </Fragment>
          ))}
      </Stack>
    </Grid>
  );
}

export default Evolutions;
