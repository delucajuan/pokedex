import useSWR from 'swr';
import { FetchError, PokemonDetail } from '@/types/types';
import { fetcher } from '../utils/fetcher';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useEvolutionChain = (evolutionChain: string[] | undefined) => {
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

  const {
    data: firstEvolution,
    error: firstError,
    isLoading: firstLoading,
  } = useSWR<PokemonDetail>(
    evolutionChain && evolutionChain[0]
      ? `${API_URL}/pokemon/name/${evolutionChain[0]}`
      : null,
    fetcher,
    swrOptions
  );

  const {
    data: secondEvolution,
    error: secondError,
    isLoading: secondLoading,
  } = useSWR<PokemonDetail>(
    evolutionChain && evolutionChain[1]
      ? `${API_URL}/pokemon/name/${evolutionChain[1]}`
      : null,
    fetcher,
    swrOptions
  );

  const {
    data: thirdEvolution,
    error: thirdError,
    isLoading: thirdLoading,
  } = useSWR<PokemonDetail>(
    evolutionChain && evolutionChain[2]
      ? `${API_URL}/pokemon/name/${evolutionChain[2]}`
      : null,
    fetcher,
    swrOptions
  );

  const data = [firstEvolution, secondEvolution, thirdEvolution].filter(
    Boolean
  ) as PokemonDetail[];
  const error = firstError || secondError || thirdError;
  const isLoading = firstLoading || secondLoading || thirdLoading;

  return {
    data,
    error,
    isLoading,
  };
};

export default useEvolutionChain;
