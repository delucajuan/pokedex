import axios from 'axios';

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 404) {
    return { data: [], total: 0 };
  }
  throw error;
};
