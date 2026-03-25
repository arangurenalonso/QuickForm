'use client';
import DataTable, {
  DataTableQueryState,
  DEFAULT_DATA_TABLE_QUERY_STATE,
} from '@/common/components/dynamic-table/DataTable';
import {
  DynamicTableRowType,
  DynamicTableColumnType,
  renderCellParamsType,
} from '@/common/components/dynamic-table/dynamic-table.types';
import { DEFAULT_EMPTY_PAGINATION } from '@/common/components/dynamic-table/dynamic-table.utils';
import { QuestionTypeFiltersGroupType } from '@/common/components/filters/filters.types';
import useAuthErrorModalWatcher from '@/common/components/molecules/error/useAuthErrorModalWatcher';
import { PaginationResultType } from '@/common/components/pagination/pagination.types';
import useFormStore from '@/modules/form/hooks/useFormStore';
import { ModalErrorType, ModalId } from '@/modules/ui/store/modal/modal.type';
import { Plus } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/common/libs/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import useModalhook from '@/modules/ui/store/modal/useModalhook';
import FormEditorForm, {
  FormCreatedValues,
} from '../components/dashboard/form/FormEditorForm';
import StatusBadge, {
  isFormStatusDto,
} from '@/common/components/molecules/StatusBadge';
import { isFormActionArray } from '@/modules/form/enum/form.enum';
import FormRowActions from '../components/dashboard/form/FormRowActions';

const FormsList = () => {
  const {
    searchForms,
    getFormColumns,
    getQuestionTypeFiltersCatalog,
    createFormProcess,
    error,
  } = useFormStore();
  const { openModal, closeModal } = useModalhook();
  const { toast } = useToast();
  const router = useRouter();

  useAuthErrorModalWatcher({
    error,
    id: ModalErrorType.GET_FORMS_ERROR,
  });

  const handleOpenCreateFormModal = () => {
    const handleSubmit = async (values: FormCreatedValues) => {
      const res = await createFormProcess(values.name, values.description);

      if (!res) {
        return;
      }

      const url = `/builder/${res.data}`;
      toast({
        title: 'Success',
        description: 'Form created successfully',
      });

      router.push(url);
      closeModal(ModalId.CREATE_FORM);
    };

    openModal({
      id: ModalId.CREATE_FORM,
      title: 'Create new form',
      titleDescription: 'Create a new form to start collecting responses.',
      content: (
        <FormEditorForm
          submitCallback={handleSubmit}
          cancelCallback={() => closeModal(ModalId.CREATE_FORM)}
        />
      ),
    });
  };

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
    const result = await getFormColumns();
    if (!result) {
      return;
    }
    const resultTransform = result.map((column) => {
      if (column.key === 'status') {
        return {
          ...column,
          renderCell: (params: renderCellParamsType) => {
            if (isFormStatusDto(params.value)) {
              return <StatusBadge status={params.value} size="sm" />;
            }
            return String(params.value);
          },
        };
      }
      if (column.key === 'action') {
        return {
          ...column,
          renderCell: (params: renderCellParamsType) => {
            const formId = params.row['id'];

            if (isFormActionArray(params.value)) {
              return (
                <>
                  <FormRowActions
                    currentActions={params.value}
                    onEdit={() => router.push(`/builder/${formId}`)}
                    onView={() => router.push(`/builder/${formId}`)}
                    onViewSubmissions={() =>
                      router.push(`/dashboard/submissions/${formId}`)
                    }
                  />
                </>
              );
            }
            return String(params.value);
          },
        };
      }
      return column;
    });

    setColumn(resultTransform);
  }, [getFormColumns, router]);

  const handleGetFormsPagination = useCallback(
    async (queryState: DataTableQueryState) => {
      const { page, pageSize, filters } = queryState;
      const result = await searchForms(page, pageSize, filters);
      if (!result) {
        return;
      }
      setData(result);
    },
    [searchForms]
  );
  useEffect(() => {
    void handleLoadCatalog();
  }, [handleLoadCatalog]);

  useEffect(() => {
    void handleLoadColumns();
  }, [handleLoadColumns]);

  useEffect(() => {
    void handleGetFormsPagination(DEFAULT_DATA_TABLE_QUERY_STATE);
  }, [handleGetFormsPagination]);

  return (
    <>
      <DataTable
        title="Forms"
        description="Manage all your forms, visibility, and publishing status from a single place."
        columns={column}
        data={data}
        catalog={catalog}
        onChange={handleGetFormsPagination}
        action={
          <Button className="rounded-xl" onClick={handleOpenCreateFormModal}>
            <Plus className="mr-2 h-4 w-4" />
            Create form
          </Button>
        }
      />
    </>
  );
};

export default FormsList;
