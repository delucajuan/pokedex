import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { FetchError, PokemonDetail } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const usePokemonDetails = (name: string) => {
  const url = `${API_URL}/pokemon/name/${name}`;
  const swrOptions = {
    shouldRetryOnError: (error: FetchError) => {
      // Disable retry if the status code is between 400 and 499
      if (error.status && error.status >= 400 && error.status < 500) {
        return false;
      }
      // Retry for other errors
      return true;
    },
  };

  const { data, error, isLoading } = useSWR<PokemonDetail>(url, fetcher, swrOptions);

  return {
    data,
    error,
    isLoading,
  };
};

export default usePokemonDetails;
