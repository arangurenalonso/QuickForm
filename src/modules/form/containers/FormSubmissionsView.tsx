'use client';

import { useCallback, useEffect, useState } from 'react';
import DynamicTable from '@/common/components/dynamic-table/DynamicTable';
import Pagination from '@/common/components/pagination/Pagination';
import Filters from '@/common/components/filters/Filters';
import {
  AppliedFilterType,
  QuestionTypeFiltersGroupType,
} from '@/common/components/filters/filters.types';
import useFormStore from '../hooks/useFormStore';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from '@/common/components/dynamic-table/dynamic-table.types';
import { PaginationResultType } from '@/common/components/pagination/pagination.types';

type FormSubmissionsViewProps = {
  idForm: string;
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
  const {
    getSubmissions,
    getDynamicHeaderListSubmissions,
    getQuestionTypeFiltersCatalog,
  } = useFormStore();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [catalog, setCatalog] = useState<QuestionTypeFiltersGroupType[]>([]);
  const [filters, setFilters] = useState<AppliedFilterType[]>([]);

  const handleApplyFilter = useCallback(
    (newFilters: AppliedFilterType[]) => {
      if (newFilters.length != filters.length) {
        setPage(1);
        setFilters(newFilters);
      }
    },
    [setFilters, filters]
  );
  const [data, setData] =
    useState<PaginationResultType<DynamicTableRowType>>(emptyPagination);
  const [column, setColumn] = useState<DynamicTableColumnType[]>([]);

  const handleLoadCatalog = useCallback(async () => {
    const result = await getQuestionTypeFiltersCatalog();
    if (!result) {
      return;
    }

    setCatalog(result);
  }, [getQuestionTypeFiltersCatalog]);

  const handleLoadColumns = useCallback(async () => {
    const result = await getDynamicHeaderListSubmissions(idForm);
    if (!result) {
      return;
    }
    setColumn(result);
  }, [getDynamicHeaderListSubmissions, idForm]);

  const handleGetSubmissions = useCallback(async () => {
    if (!idForm) {
      return;
    }
    const result = await getSubmissions(idForm, page, pageSize, filters);
    if (!result) {
      return;
    }
    setData(result);
  }, [idForm, page, pageSize, getSubmissions, filters]);

  useEffect(() => {
    void handleLoadCatalog();
  }, [handleLoadCatalog]);

  useEffect(() => {
    void handleLoadColumns();
  }, [handleLoadColumns]);

  useEffect(() => {
    void handleGetSubmissions();
  }, [handleGetSubmissions]);

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
        columns={column}
        catalog={catalog}
        onApplyFilters={handleApplyFilter}
      />

      <DynamicTable
        columns={column}
        rows={data.items}
        emptyMessage="This form does not have submissions yet."
      />

      <Pagination
        pagination={data}
        pageSizeOptions={[5, 10, 25, 50, 100]}
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
