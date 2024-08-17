'use client';
import CustomPagination from '@/components/Pagination';
import PokemonCard from '@/components/PokemonCard';
import useAllPokemon from '@/hooks/useAllPokemon';
import { Box, Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const page = parseInt(pageParam ?? '1', 10);
  const { data: pokemonData, isLoading, error } = useAllPokemon(page);

  if (isLoading) return <div>Loading...</div>;
  if (error || !pokemonData?.data) return <div>Failed to load Pokémon</div>;
  return (
    <>
      <Grid container spacing={2} justifyContent="center" paddingY={2}>
        {pokemonData.data.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </Grid>
      <Box display="flex" justifyContent="center">
        <CustomPagination currentPage={page} totalPages={pokemonData.metadata.pages} />
      </Box>
    </>
  );
}
