import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const usePokemonNames = ({
  limit = 6,
  searchValue,
}: {
  limit?: number;
  searchValue: string;
}) => {
  const url = searchValue
    ? `${API_URL}/pokemon/names?limit=${limit}&search=${searchValue}`
    : null;

  const { data, error, isLoading } = useSWR<string[]>(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default usePokemonNames;
