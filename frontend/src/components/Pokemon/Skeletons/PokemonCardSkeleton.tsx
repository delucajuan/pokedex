import { Box, Card, Grid, Skeleton, Typography } from '@mui/material';
import TypesChips from '../TypesChips';
import StatsRating from '../StatsRating';

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
              <TypesChips />
              <StatsRating />
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}
export default PokemonCardSkeleton;
