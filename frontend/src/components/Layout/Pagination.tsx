'use client';
import { CustomPaginationProps } from '@/types/types';
import Pagination from '@mui/material/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

function CustomPagination({ totalPages, currentPage }: CustomPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params}`);
  };
  return (
    <Pagination
      count={totalPages}
      color="primary"
      page={currentPage}
      onChange={handlePageChange}
    />
  );
}

export default CustomPagination;
