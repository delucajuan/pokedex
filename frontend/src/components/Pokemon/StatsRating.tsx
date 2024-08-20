import { capitalizeFirstLetter } from '@/utils/textFormatters';
import { Stack, Divider, Typography, Rating, Box, Skeleton } from '@mui/material';
import { Fragment } from 'react';
import PokeballIcon from './PokeballIcon';
import { StatsRatingProps } from '@/types/types';

function StatsRating({ stats, size = 1, ...stackProps }: StatsRatingProps) {
  const STATS_SKELETONS = 6;
  const POKEBALLS_SKELETONS = 5;

  if (!stats) {
    // Render Skeletons
    return (
      <Stack spacing={0.5} paddingTop={2} width="100%" {...stackProps}>
        {[...Array(STATS_SKELETONS)].map((_, index) => (
          <Fragment key={index}>
            {index !== 0 && <Divider />}
            <Stack direction="row" display="flex" justifyContent="space-between">
              <Skeleton>
                <Typography component="legend" variant="body2">
                  Special attack
                </Typography>
              </Skeleton>
              <Box display="inline-flex">
                {[...Array(POKEBALLS_SKELETONS)].map((_, index) => (
                  <Skeleton
                    height={18 * size}
                    width={18 * size}
                    key={index}
                    variant="circular"
                    sx={{ margin: 0.25 }}
                  />
                ))}
              </Box>
            </Stack>
          </Fragment>
        ))}
      </Stack>
    );
  }

  return (
    // Render Stats
    <Stack spacing={0.5} paddingTop={2} width="100%" {...stackProps}>
      {stats?.map((stat, index) => (
        <Fragment key={stat.name}>
          {index !== 0 && <Divider />}
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography component="legend" variant="body2" fontSize={`${0.875 * size}rem`}>
              {capitalizeFirstLetter(stat.name)}
            </Typography>
            <Rating
              name="read-only"
              value={(stat.base / 200) * 5}
              readOnly
              icon={<PokeballIcon fontSize={`${1.3 * size}rem`} />}
              emptyIcon={
                <PokeballIcon variant="outlined" fontSize={`${1.3 * size}rem`} opacity={0.2} />
              }
            />
          </Stack>
        </Fragment>
      ))}
    </Stack>
  );
}

export default StatsRating;
