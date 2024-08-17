'use client';
import { CustomPaginationProps } from '@/types/types';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation';

function CustomPagination({ totalPages, currentPage }: CustomPaginationProps) {
  const router = useRouter();
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push(`?page=${page}`);
  };
  return (
    <Pagination
      count={totalPages}
      color="secondary"
      page={currentPage}
      onChange={handlePageChange}
      sx={{ padding: 2 }}
    />
  );
}

export default CustomPagination;
