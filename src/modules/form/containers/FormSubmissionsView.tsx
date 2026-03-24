'use client';

import { useCallback, useEffect, useState } from 'react';
import { QuestionTypeFiltersGroupType } from '@/common/components/filters/filters.types';
import useFormStore from '../hooks/useFormStore';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from '@/common/components/dynamic-table/dynamic-table.types';
import { PaginationResultType } from '@/common/components/pagination/pagination.types';
import useAuthErrorModalWatcher from '@/common/components/molecules/error/useAuthErrorModalWatcher';
import { ModalErrorType } from '@/modules/ui/store/modal/modal.type';
import DataTable, {
  DataTableQueryState,
  DEFAULT_DATA_TABLE_QUERY_STATE,
} from '@/common/components/dynamic-table/DataTable';
import { DEFAULT_EMPTY_PAGINATION } from '@/common/components/dynamic-table/dynamic-table.utils';

type FormSubmissionsViewProps = {
  idForm: string;
};

const FormSubmissionsView = ({ idForm }: FormSubmissionsViewProps) => {
  const {
    getSubmissions,
    getDynamicHeaderListSubmissions,
    getQuestionTypeFiltersCatalog,
    error,
  } = useFormStore();

  useAuthErrorModalWatcher({
    error,
    id: ModalErrorType.GET_SUBMISSIONS_ERROR,
  });

  const [catalog, setCatalog] = useState<QuestionTypeFiltersGroupType[]>([]);

  const [data, setData] = useState<PaginationResultType<DynamicTableRowType>>(
    DEFAULT_EMPTY_PAGINATION
  );
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

  const handleGetSubmissions = useCallback(
    async (queryState: DataTableQueryState) => {
      if (!idForm) {
        return;
      }
      const { page, pageSize, filters } = queryState;
      const result = await getSubmissions(idForm, page, pageSize, filters);
      if (!result) {
        return;
      }
      setData(result);
    },
    [idForm, getSubmissions]
  );

  useEffect(() => {
    void handleLoadCatalog();
  }, [handleLoadCatalog]);

  useEffect(() => {
    void handleLoadColumns();
  }, [handleLoadColumns]);

  useEffect(() => {
    void handleGetSubmissions(DEFAULT_DATA_TABLE_QUERY_STATE);
  }, [handleGetSubmissions]);

  return (
    <section className="min-w-0 space-y-4 p-4 md:p-6">
      <DataTable
        title="Submissions"
        description="Review all responses submitted for this form."
        columns={column}
        data={data}
        catalog={catalog}
        onChange={handleGetSubmissions}
      />
    </section>
  );
};

export default FormSubmissionsView;
