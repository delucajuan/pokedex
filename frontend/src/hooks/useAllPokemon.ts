import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { AllPokemonResponse } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useAllPokemon = ({
  limit = 12,
  page = 1,
  name,
  type,
}: {
  limit?: number;
  page?: number;
  name?: string;
  type?: string;
}) => {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('page', page.toString());

  if (name) {
    params.append('name', name);
  }
  if (type) {
    params.append('type', type);
  }

  const url = `${API_URL}/pokemon?${params.toString()}`;
  const { data, error, isLoading } = useSWR<AllPokemonResponse>(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default useAllPokemon;
