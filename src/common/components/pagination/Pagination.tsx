import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from './pagination.types';
import {
  getPaginationRange,
  normalizePageSizeOptions,
} from './pagination.utils';

const Pagination = ({
  pagination,
  pageSizeOptions = [5, 10, 25, 50, 100],
  className,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  if (pagination.totalCount === 0) {
    return null;
  }

  const normalizedPageSizeOptions = normalizePageSizeOptions(
    pageSizeOptions,
    pagination.pageSize
  );

  const range = getPaginationRange(
    pagination.currentPage,
    pagination.pageSize,
    pagination.totalCount
  );

  return (
    <div
      className={clsx(
        'flex w-full flex-col gap-3 border-t border-slate-200 px-2 py-3',
        'sm:flex-row sm:items-center sm:justify-end',
        'dark:border-slate-700',
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-end gap-4 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <label htmlFor="pagination-page-size" className="whitespace-nowrap">
            Rows per page:
          </label>

          <div className="relative">
            <select
              id="pagination-page-size"
              value={pagination.pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
              className="
                h-8 appearance-none rounded-md border border-transparent bg-transparent
                px-2 pr-6 text-sm text-slate-700 outline-none transition
                hover:bg-slate-100 focus:bg-slate-100
                dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:bg-slate-800
              "
            >
              {normalizedPageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400">
              ▼
            </span>
          </div>
        </div>

        <div className="whitespace-nowrap text-slate-700 dark:text-slate-200">
          {range.start}–{range.end} of {pagination.totalCount}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPreviousPage}
            aria-label="Go to previous page"
            className="
              inline-flex h-8 w-8 items-center justify-center rounded-md
              text-slate-500 transition hover:bg-slate-100 hover:text-slate-700
              disabled:cursor-not-allowed disabled:opacity-35
              dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200
            "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            aria-label="Go to next page"
            className="
              inline-flex h-8 w-8 items-center justify-center rounded-md
              text-slate-500 transition hover:bg-slate-100 hover:text-slate-700
              disabled:cursor-not-allowed disabled:opacity-35
              dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
