'use client';
import { CustomPaginationProps } from '@/types/types';
import { useMediaQuery } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

function CustomPagination({ totalPages, currentPage }: CustomPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isXxs = useMediaQuery('(max-width: 395px)');

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params}`);
  };
  return (
    <Pagination
      count={totalPages}
      color="primary"
      size={isXxs ? 'small' : 'medium'}
      page={currentPage}
      onChange={handlePageChange}
      sx={{ paddingY: 2 }}
    />
  );
}

export default CustomPagination;
