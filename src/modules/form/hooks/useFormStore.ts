'use client';

import { useCallback, useMemo, useState } from 'react';
import { isOk } from '@/common/types/result';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { formService } from '../services/form.service';
import { useBoundStore } from '@/store';
import { withGlobalLoading } from '@/common/utils/withGlobalLoading';
import { AppliedFilterType } from '@/common/components/filters/filters.types';
import { SectionType } from '../components/form-designer/context/designer-context.type';

export default function useFormStore() {
  const formSelected = useBoundStore((state) => state.formSelected);
  const setFormSelected = useBoundStore((state) => state.setFormSelected);
  const clearFormSelected = useBoundStore((state) => state.clearFormSelected);
  const persistedStructure = useBoundStore((state) => state.persistedStructure);
  const draftStructure = useBoundStore((state) => state.draftStructure);
  const setPersistedStructure = useBoundStore(
    (state) => state.setPersistedStructure
  );
  const setDraftStructure = useBoundStore((state) => state.setDraftStructure);

  const [error, setError] = useState<AuthError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const publishForm = useCallback(
    async (idForm: string, payload: SectionType[]) => {
      clearError();
      const res = await formService.publishForm(idForm, payload);
      if (!isOk(res)) {
        setError(res.error);
        return;
      }
      return res.value;
    },
    [clearError]
  );

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
      const formTemplate = await withGlobalLoading(
        () => formService.getFormTemplateByIdForm(idForm),
        'Loading form...'
      );

      if (!isOk(formTemplate)) {
        setError(formTemplate.error);
        return;
      }
      return formTemplate.value;
    },
    [clearError]
  );

  const getQuestionTypeFiltersCatalog = useCallback(async () => {
    clearError();
    const catalog = await withGlobalLoading(
      () => formService.getQuestionTypeFiltersCatalog(),
      'Loading filters catalog...'
    );

    if (!isOk(catalog)) {
      setError(catalog.error);
      return;
    }
    return catalog.value;
  }, [clearError]);

  const submitForm = useCallback(
    async (idForm: string, payload: unknown) => {
      clearError();
      const result = await withGlobalLoading(
        () => formService.submitForm(idForm, payload),
        'Submitting form...'
      );

      if (!isOk(result)) {
        setError(result.error);
        return;
      }
      return result.value;
    },
    [clearError]
  );

  const searchForms = useCallback(
    async (page: number, pageSize: number, filters: AppliedFilterType[]) => {
      clearError();
      const result = await withGlobalLoading(
        () => formService.searchForms(page, pageSize, filters),
        'Loading forms...'
      );

      if (!isOk(result)) {
        setError(result.error);
        return;
      }
      return result.value;
    },
    [clearError]
  );
  const getSubmissions = useCallback(
    async (
      idForm: string,
      page: number,
      pageSize: number,
      filters: AppliedFilterType[]
    ) => {
      clearError();
      const result = await withGlobalLoading(
        () =>
          formService.getSubmissionsByFormId(idForm, page, pageSize, filters),
        'Loading submissions...'
      );

      if (!isOk(result)) {
        setError(result.error);
        return;
      }
      return result.value;
    },
    [clearError]
  );

  const getDynamicHeaderListSubmissions = useCallback(
    async (idForm: string) => {
      clearError();
      const result = await withGlobalLoading(
        () => formService.getDynamicHeaderListSubmissions(idForm),
        'Loading submissions headers...'
      );

      if (!isOk(result)) {
        setError(result.error);
        return;
      }
      return result.value;
    },
    [clearError]
  );

  const getFormColumns = useCallback(async () => {
    clearError();
    const result = await withGlobalLoading(
      () => formService.getFormColumns(),
      'Loading form columns...'
    );

    if (!isOk(result)) {
      setError(result.error);
      return;
    }
    return result.value;
  }, [clearError]);
  const isDirty = useMemo(() => {
    return (
      JSON.stringify(draftStructure ?? []) !==
      JSON.stringify(persistedStructure ?? [])
    );
  }, [draftStructure, persistedStructure]);
  return useMemo(
    () => ({
      formSelected,
      draftStructure,
      persistedStructure,
      error,
      isDirty,
      createFormProcess,
      getForms,
      clearError,
      getFormDetail,
      saveFormStructure,
      handleClearFormSelected,
      publishForm,
      getFormTemplate,
      getFormForSubmission,
      submitForm,
      getSubmissions,
      getDynamicHeaderListSubmissions,
      getFormColumns,
      getQuestionTypeFiltersCatalog,
      searchForms,
      setPersistedStructure,
      setDraftStructure,
    }),
    [
      formSelected,
      draftStructure,
      persistedStructure,
      error,
      isDirty,
      createFormProcess,
      getForms,
      clearError,
      getFormDetail,
      publishForm,
      saveFormStructure,
      handleClearFormSelected,
      getFormTemplate,
      getFormForSubmission,
      submitForm,
      getSubmissions,
      getDynamicHeaderListSubmissions,
      getFormColumns,
      getQuestionTypeFiltersCatalog,
      searchForms,
      setPersistedStructure,
      setDraftStructure,
    ]
  );
}
