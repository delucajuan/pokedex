import { Box, Card, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';

const TYPES = 2;
const STATS = 6;
const POKEBALLS = 5;

function PokemonCardSkeleton() {
  return (
    <Grid item>
      <Card variant="elevation" sx={{ width: 276, borderRadius: 5 }}>
        <Box sx={{ padding: 2, height: 490 }}>
          <Skeleton variant="rounded" height={154} sx={{ margin: 1 }} />
          <Box
            sx={{
              height: 284,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box marginY="auto">
              <Skeleton>
                <Typography variant="body2">#18</Typography>
              </Skeleton>
              <Skeleton>
                <Typography variant="h5" component="div">
                  Bulbasaur
                </Typography>
              </Skeleton>
            </Box>
            <Box>
              <Stack direction="row" spacing={1}>
                {[...Array(TYPES)].map((_, index) => (
                  <Skeleton
                    variant="rounded"
                    height={24}
                    sx={{ borderRadius: 50 }}
                    key={index}
                    width="50%"
                  />
                ))}
              </Stack>
              <Stack spacing={0.5} paddingTop={2}>
                {[...Array(STATS)].map((_, index) => (
                  <Fragment key={index}>
                    {index !== 0 && <Divider />}
                    <Stack direction="row" display="flex" justifyContent="space-between">
                      <Skeleton>
                        <Typography component="legend" variant="body2">
                          Special attack
                        </Typography>
                      </Skeleton>
                      <Box display="inline-flex">
                        {[...Array(POKEBALLS)].map((_, index) => (
                          <Skeleton
                            height={18}
                            width={18}
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
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}
export default PokemonCardSkeleton;
