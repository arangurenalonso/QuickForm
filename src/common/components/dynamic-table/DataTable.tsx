'use client';

import { useCallback, useEffect, useState } from 'react';
import DynamicTable from '@/common/components/dynamic-table/DynamicTable';
import Pagination from '@/common/components/pagination/Pagination';
import Filters from '@/common/components/filters/Filters';
import {
  AppliedFilterType,
  QuestionTypeFiltersGroupType,
} from '@/common/components/filters/filters.types';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from '@/common/components/dynamic-table/dynamic-table.types';
import { PaginationResultType } from '@/common/components/pagination/pagination.types';

export type DataTableQueryState = {
  page: number;
  pageSize: number;
  filters: AppliedFilterType[];
};

export const DEFAULT_DATA_TABLE_QUERY_STATE: DataTableQueryState = {
  page: 1,
  pageSize: 10,
  filters: [],
};

type DataTableProps = {
  title: string;
  description: string;
  columns: DynamicTableColumnType[];
  data: PaginationResultType<DynamicTableRowType>;
  catalog: QuestionTypeFiltersGroupType[];
  onChange: (properties: DataTableQueryState) => void;
};

const DataTable = ({
  title,
  description,
  columns,
  data,
  catalog,
  onChange,
}: DataTableProps) => {
  const [queryState, setQueryState] = useState<DataTableQueryState>(
    DEFAULT_DATA_TABLE_QUERY_STATE
  );

  const handleApplyFilter = useCallback(
    (newFilters: AppliedFilterType[]) => {
      if (newFilters.length != queryState.filters.length) {
        setQueryState((prev) => ({ ...prev, page: 1, filters: newFilters }));
      }
    },
    [setQueryState, queryState]
  );

  useEffect(() => {
    onChange(queryState);
  }, [queryState, onChange]);

  return (
    <section className="min-w-0 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <Filters
        columns={columns}
        catalog={catalog}
        onApplyFilters={handleApplyFilter}
      />

      <DynamicTable
        columns={columns}
        rows={data.items}
        emptyMessage="This form does not have submissions yet."
      />

      <Pagination
        pagination={data}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        onPageChange={(nextPage) =>
          setQueryState((prev) => ({ ...prev, page: nextPage }))
        }
        onPageSizeChange={(nextPageSize) => {
          setQueryState((prev) => ({
            ...prev,
            page: 1,
            pageSize: nextPageSize,
          }));
        }}
      />
    </section>
  );
};

export default DataTable;
