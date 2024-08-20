'use client';
import CustomPagination from '@/components/Layout/Pagination';
import PokemonCard from '@/components/Pokemon/PokemonCard';
import PokemonCardSkeleton from '@/components/Pokemon/PokemonCardSkeleton';
import TypesMenu from '@/components/UI/TypesMenu';
import useAllPokemon from '@/hooks/useAllPokemon';
import { Box, Grid, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import Error from '@/components/Error';

function Home() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const nameParam = searchParams.get('name');
  const typeParam = searchParams.get('type');
  const page = parseInt(pageParam ?? '1', 10);
  const name = nameParam ? decodeURIComponent(nameParam) : undefined;
  const type = typeParam ? decodeURIComponent(typeParam) : undefined;

  const { data: pokemonData, isLoading, error } = useAllPokemon({ page, name, type });

  if (error) return <Error errorType="server" />;
  return (
    <>
      <Stack direction="row" justifyContent="flex-end">
        <TypesMenu />
      </Stack>
      <Grid container spacing={2} justifyContent="center" paddingY={2}>
        {isLoading ? (
          // Loading skeleton
          [...Array(12)].map((_, index) => <PokemonCardSkeleton key={index} />)
        ) : pokemonData?.data.length ? (
          // Pokemon data
          pokemonData?.data.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.name} />
          ))
        ) : (
          // No results
          <Error errorType="notResults" />
        )}
      </Grid>
      <Box display="flex" justifyContent="center">
        <CustomPagination currentPage={page} totalPages={pokemonData?.metadata.pages || 10} />
      </Box>
    </>
  );
}

export default Home;
