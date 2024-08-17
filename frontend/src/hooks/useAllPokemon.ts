import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { AllPokemonResponse } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useAllPokemon = (page: number) => {
  const { data, error, isLoading } = useSWR<AllPokemonResponse>(
    `${API_URL}/pokemon?limit=12&page=${page}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useAllPokemon;
