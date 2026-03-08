import { PaginationItemType } from './pagination.types';

export function normalizePageSizeOptions(
  pageSizeOptions: number[],
  currentPageSize: number
): number[] {
  const validOptions = pageSizeOptions.filter(
    (value) => Number.isInteger(value) && value > 0
  );

  const uniqueOptions = Array.from(
    new Set([...validOptions, currentPageSize])
  ).sort((a, b) => a - b);

  return uniqueOptions.length > 0 ? uniqueOptions : [10, 25, 50, 100];
}

export function buildPaginationItems(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number
): PaginationItemType[] {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PaginationItemType[] = [];
  const siblingCount = Math.max(1, Math.floor((maxVisiblePages - 3) / 2));

  const leftBoundary = Math.max(2, currentPage - siblingCount);
  const rightBoundary = Math.min(totalPages - 1, currentPage + siblingCount);

  items.push(1);

  if (leftBoundary > 2) {
    items.push('left-ellipsis');
  }

  for (let page = leftBoundary; page <= rightBoundary; page += 1) {
    items.push(page);
  }

  if (rightBoundary < totalPages - 1) {
    items.push('right-ellipsis');
  }

  items.push(totalPages);

  return items;
}

export function getPaginationRange(
  currentPage: number,
  pageSize: number,
  totalCount: number
) {
  if (totalCount === 0) {
    return {
      start: 0,
      end: 0,
    };
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  return { start, end };
}
