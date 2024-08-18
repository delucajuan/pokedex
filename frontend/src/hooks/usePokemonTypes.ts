import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const usePokemonTypes = () => {
  const url = `${API_URL}/pokemon/types`;

  const { data, error, isLoading } = useSWR<string[]>(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default usePokemonTypes;
