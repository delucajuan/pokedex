import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { AllPokemonResponse } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useAllPokemon = ({
  limit = 12,
  page = 1,
  name,
}: {
  limit?: number;
  page?: number;
  name?: string;
}) => {
  const url = `${API_URL}/pokemon?limit=${limit}&page=${page}${
    name ? `&name=${encodeURIComponent(name)}` : ''
  }`;

  const { data, error, isLoading } = useSWR<AllPokemonResponse>(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default useAllPokemon;
