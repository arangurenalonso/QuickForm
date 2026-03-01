'use client';

import { useCallback, useMemo, useState } from 'react';
import { isOk } from '@/common/types/result';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { formService } from '../services/form.service';
import { SectionType } from '../components/form-designer/context/designer-context.type';
import { useBoundStore } from '@/store';

export default function useFormStore() {
  const formSelected = useBoundStore((state) => state.formSelected);
  const setFormSelected = useBoundStore((state) => state.setFormSelected);
  const clearFormSelected = useBoundStore((state) => state.clearFormSelected);

  const [error, setError] = useState<AuthError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

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
    [clearError]
  );
  const getForms = useCallback(async () => {
    clearError();
    const res = await formService.getForms();
    if (!isOk(res)) {
      setError(res.error);
      return;
    }
    return res.value;
  }, [clearError]);

  const getFormForSubmission = useCallback(
    async (idForm: string) => {
      clearError();
      const res = await formService.getFormById(idForm);
      if (!isOk(res)) {
        setError(res.error);
        return;
      }
      return res.value;
    },
    [clearError]
  );
  const getFormDetail = useCallback(
    async (idForm: string) => {
      clearError();
      const [structureRes, formRes] = await Promise.all([
        formService.getFormStructureByIdForm(idForm),
        formService.getFormById(idForm),
      ]);

      if (!isOk(formRes)) {
        setError(formRes.error);
        return;
      }

      if (!isOk(structureRes)) {
        setError(structureRes.error);
        return;
      }
      setFormSelected(formRes.value);
      return {
        structure: structureRes.value,
        form: formRes.value,
      };
    },
    [clearError, setFormSelected]
  );
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
    [clearError]
  );
  const handleClearFormSelected = useCallback(() => {
    clearFormSelected();
  }, [clearFormSelected]);

  const getFormTemplate = useCallback(
    async (idForm: string) => {
      clearError();
      const formTemplate = await formService.getFormTemplateByIdForm(idForm);

      if (!isOk(formTemplate)) {
        setError(formTemplate.error);
        return;
      }
      return formTemplate.value;
    },
    [clearError]
  );
  return useMemo(
    () => ({
      formSelected,
      error,
      createFormProcess,
      getForms,
      clearError,
      getFormDetail,
      saveFormStructure,
      handleClearFormSelected,
      getFormTemplate,
      getFormForSubmission,
    }),
    [
      formSelected,
      error,
      createFormProcess,
      getForms,
      clearError,
      getFormDetail,
      saveFormStructure,
      handleClearFormSelected,
      getFormTemplate,
      getFormForSubmission,
    ]
  );
}
