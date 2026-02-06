'use client';

import { useCallback, useMemo, useState } from 'react';
import { isOk } from '@/common/types/result';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { formService } from '../services/form.service';
import { SectionType } from '../form-designer/context/designer-context.type';
import { useBoundStore } from '@/store';

export default function useFormStore() {
  const formSelected = useBoundStore((state) => state.formSelected);
  const setFormSelected = useBoundStore((state) => state.setFormSelected);

  const [error, setError] = useState<AuthError | null>(null);

  const createFormProcess = useCallback(
    async (name: string, description?: string) => {
      clearError();
      const res = await formService.createForm({ name, description });
      if (!isOk(res)) {
        setError(res.error);
        return;
      }
      return res.value;
    },
    []
  );
  const getFormaProcess = useCallback(async () => {
    clearError();
    const res = await formService.getForms();
    if (!isOk(res)) {
      setError(res.error);
      return;
    }
    return res.value;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getFormStructure = useCallback(async (idForm: string) => {
    clearError();
    const res = await formService.getFormStructureByIdForm(idForm);
    if (!isOk(res)) {
      setError(res.error);
      return;
    }
    return res.value;
  }, []);
  const saveFormStructure = useCallback(
    async (payload: SectionType[], idForm: string) => {
      clearError();
      const res = await formService.saveFormStructure(payload, idForm);
      if (!isOk(res)) {
        setError(res.error);
        return;
      }
      return res.value;
    },
    []
  );
  return useMemo(
    () => ({
      formSelected,
      error,
      createFormProcess,
      getFormaProcess,
      clearError,
      getFormStructure,
      saveFormStructure,
      setFormSelected,
    }),
    [
      formSelected,
      error,
      createFormProcess,
      getFormaProcess,
      clearError,
      getFormStructure,
      saveFormStructure,
      setFormSelected,
    ]
  );
}
