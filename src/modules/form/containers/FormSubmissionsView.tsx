'use client';

import { useCallback, useEffect, useState } from 'react';
import DynamicTable from '@/common/components/dynamic-table/DynamicTable';
import Pagination from '@/common/components/pagination/Pagination';
import { PaginationResultType } from '@/common/components/pagination/pagination.types';
import useFormStore from '../hooks/useFormStore';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from '@/common/components/dynamic-table/dynamic-table.types';

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

  const [data, setData] = useState<FormSubmissionsViewState>({
    columns: [],
    data: emptyPagination,
  });

  const handleGetSubmissions = useCallback(
    async (targetPage: number, targetPageSize: number) => {
      if (!idForm) {
        return;
      }

      const result = await getSubmissions(idForm, targetPage, targetPageSize);

      if (!result) {
        return;
      }

      setData(result);
    },
    [idForm, getSubmissions]
  );

  useEffect(() => {
    void handleGetSubmissions(page, pageSize);
  }, [handleGetSubmissions, page, pageSize]);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handlePageSizeChange = useCallback((nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
  }, []);

  return (
    <section className="w-full p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Submissions
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review all responses submitted for this form.
        </p>
      </div>

      <div className="space-y-4">
        <DynamicTable
          columns={data.columns}
          rows={data.data.items}
          emptyMessage="This form does not have submissions yet."
        />

        <Pagination
          pagination={data.data}
          pageSizeOptions={[1, 5, 10, 25, 50, 100]}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </section>
  );
};

export default FormSubmissionsView;
