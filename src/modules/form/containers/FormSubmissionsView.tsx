'use client';
import DynamicTable from '@/common/components/dynamic-table/DynamicTable';
import useFormStore from '../hooks/useFormStore';
import { useCallback, useEffect, useState } from 'react';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from '@/common/components/dynamic-table/dynamic-table.types';

type FormSubmissionsViewProps = {
  idForm: string;
};

const FormSubmissionsView = ({ idForm }: FormSubmissionsViewProps) => {
  const { getSubmissions } = useFormStore();
  const [data, setData] = useState<{
    columns: DynamicTableColumnType[];
    rows: DynamicTableRowType[];
  }>({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    handleGetSubmissions();
  }, []);

  const handleGetSubmissions = useCallback(async () => {
    if (!idForm) {
      return;
    }

    const result = await getSubmissions(idForm);
    if (!result) {
      return;
    }
    console.log('Submissions data:', result);
    setData(result);
  }, [idForm, setData, getSubmissions]);

  return (
    <section className="w-full p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Submissions</h2>
        <p className="text-sm text-slate-500">
          Review all responses submitted for this form.
        </p>
      </div>

      <DynamicTable
        columns={data.columns}
        rows={data.rows}
        emptyMessage="This form does not have submissions yet."
      />
    </section>
  );
};

export default FormSubmissionsView;
