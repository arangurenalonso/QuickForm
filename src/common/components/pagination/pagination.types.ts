export type PaginationStateType = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PaginationResultType<T> = PaginationStateType & {
  items: T[];
};

export type PaginationItemType = number | 'left-ellipsis' | 'right-ellipsis';

export type PaginationProps = {
  pagination: PaginationStateType;
  pageSizeOptions?: number[];
  maxVisiblePages?: number;
  className?: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};
