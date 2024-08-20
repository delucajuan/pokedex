import { FetchError } from '@/types/types';

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error: FetchError = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    error.statusText = res.statusText;
    throw error;
  }

  return res.json();
};
