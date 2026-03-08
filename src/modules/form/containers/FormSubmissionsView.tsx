'use client';

import { useCallback, useEffect, useState } from 'react';
import DynamicTable from '@/common/components/dynamic-table/DynamicTable';
import Pagination from '@/common/components/pagination/Pagination';
import useFormStore from '../hooks/useFormStore';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from '@/common/components/dynamic-table/dynamic-table.types';
import Filters from '@/common/components/filters/Filters';
import { createEmptyFilter } from '@/common/components/filters/filters.utils';
import { PaginationResultType } from '@/common/components/pagination/pagination.types';
import { FilterItemType } from '@/common/components/filters/filters.types';

type FormSubmissionsViewProps = {
  idForm: string;
};

type FormSubmissionsViewState = {
  columns: DynamicTableColumnType[];
  data: PaginationResultType<DynamicTableRowType>;
};

const emptyPagination: PaginationResultType<DynamicTableRowType> = {
  items: [],
  totalCount: 0,
  pageSize: 10,
  currentPage: 1,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};

const FormSubmissionsView = ({ idForm }: FormSubmissionsViewProps) => {
  const { getSubmissions } = useFormStore();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useState<FilterItemType[]>([
    createEmptyFilter(),
  ]);

  const [data, setData] = useState<FormSubmissionsViewState>({
    columns: [],
    data: emptyPagination,
  });

  useEffect(() => {
    console.log('filters changed', filters);
  }, [filters]);

  const handleGetSubmissions = useCallback(async () => {
    if (!idForm) {
      return;
    }

    const result = await getSubmissions(idForm, page, pageSize);

    if (!result) {
      return;
    }

    setData(result);
  }, [idForm, page, pageSize, getSubmissions]);

  useEffect(() => {
    void handleGetSubmissions();
  }, [handleGetSubmissions]);

  const handleApplyFilters = useCallback(() => {
    setPage(1);
    void handleGetSubmissions();
  }, [handleGetSubmissions]);

  const handleResetFilters = useCallback(() => {
    setFilters([createEmptyFilter()]);
    setPage(1);
  }, []);

  return (
    <section className="space-y-4 p-4 md:p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Submissions
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review all responses submitted for this form.
        </p>
      </div>

      <Filters
        columns={data.columns}
        filters={filters}
        onChange={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      <DynamicTable
        columns={data.columns}
        rows={data.data.items}
        emptyMessage="This form does not have submissions yet."
      />

      <Pagination
        pagination={data.data}
        pageSizeOptions={[10, 25, 50, 100]}
        onPageChange={setPage}
        onPageSizeChange={(nextPageSize) => {
          setPageSize(nextPageSize);
          setPage(1);
        }}
      />
    </section>
  );
};

export default FormSubmissionsView;
