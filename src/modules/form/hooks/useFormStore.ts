'use client';

import { useCallback, useMemo, useState } from 'react';
import { isOk } from '@/common/types/result';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { formService } from '../services/form.service';
import { useBoundStore } from '@/store';
import { withGlobalLoading } from '@/common/utils/withGlobalLoading';
import { AppliedFilterType } from '@/common/components/filters/filters.types';
import { SectionType } from '../components/form-designer/context/designer-context.type';
import { FORM_ACTION, FormStatus } from '../enum/form.enum';

export default function useFormStore() {
  const formSelected = useBoundStore((state) => state.formSelected);
  const setFormSelected = useBoundStore((state) => state.setFormSelected);
  const clearFormSelected = useBoundStore((state) => state.clearFormSelected);
  const persistedStructure = useBoundStore((state) => state.persistedStructure);
  const draftStructure = useBoundStore((state) => state.draftStructure);
  const setTypeRender = useBoundStore((state) => state.setTypeRender);
  const typeRender = useBoundStore((state) => state.typeRender);
  const setRenderMode = useBoundStore((state) => state.setRenderMode);
  const updateBasicInformation = useBoundStore(
    (state) => state.updateBasicInformation
  );
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
      const res = await withGlobalLoading(
        () => formService.publishForm(idForm, payload),
        'Publishing form...'
      );
      if (!isOk(res)) {
        setError(res.error);
        return;
      }
      const formType = res.value?.data ?? null;
      if (formType) {
        setFormSelected(formType);
      }
      return res.value;
    },
    [clearError, setFormSelected]
  );

  const createFormProcess = useCallback(
    async (name: string, description?: string) => {
      clearError();
      const res = await withGlobalLoading(
        () => formService.createForm({ name, description }),
        'Creating form...'
      );
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

    const res = await withGlobalLoading(
      () => formService.getForms(),
      'Loading forms...'
    );
    if (!isOk(res)) {
      setError(res.error);
      return;
    }
    return res.value;
  }, [clearError]);

  const getFormForSubmission = useCallback(
    async (idForm: string) => {
      clearError();

      const res = await withGlobalLoading(
        () => formService.getFormById(idForm),
        'Loading form information...'
      );
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

      const [structureRes, formRes] = await withGlobalLoading(
        () =>
          Promise.all([
            formService.getFormStructureByIdForm(idForm),
            formService.getFormById(idForm),
          ]),
        'Loading form details...'
      );

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
    [clearError, setFormSelected, setError]
  );

  const saveFormStructure = useCallback(
    async (payload: SectionType[], idForm: string) => {
      clearError();

      const res = await withGlobalLoading(
        () => formService.saveFormStructure(payload, idForm),
        'Saving form structure...'
      );
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

  const computedDirty = useMemo(() => {
    return (
      JSON.stringify(draftStructure ?? []) !==
      JSON.stringify(persistedStructure ?? [])
    );
  }, [draftStructure, persistedStructure]);

  const editFormBasicInformation = useCallback(
    async (idForm: string, name: string, description?: string) => {
      clearError();
      const result = await withGlobalLoading(
        () => formService.updateFormBasicInformation(idForm, name, description),
        'Updating form information...'
      );
      if (!isOk(result)) {
        setError(result.error);
        return;
      }
      updateBasicInformation(name, description);
      return result.value;
    },
    [clearError, updateBasicInformation]
  );
  const handleGetTypesRender = useCallback(async () => {
    clearError();
    if (typeRender.length > 0) {
      return typeRender;
    }
    const result = await withGlobalLoading(
      () => formService.getTypesRender(),
      'Loading types render...'
    );
    if (!isOk(result)) {
      setError(result.error);
      return;
    }
    setTypeRender(result.value);
    return result.value;
  }, [clearError, setTypeRender, typeRender]);

  const updateRenderMode = useCallback(
    async (idForm: string, idTypeRender: string) => {
      clearError();
      const result = await withGlobalLoading(
        () => formService.updateRenderMode(idForm, idTypeRender),
        'Updating form render mode...'
      );
      if (!isOk(result)) {
        setError(result.error);
        return;
      }
      setRenderMode(idTypeRender);

      return result.value;
    },
    [clearError, setRenderMode]
  );
  const canEdit = useMemo(() => {
    return formSelected
      ? formSelected.status.allowedActions.includes(FORM_ACTION.Edit)
      : false;
  }, [formSelected]);
  const isPublished = useMemo(() => {
    return formSelected?.status.name === FormStatus.Published;
  }, [formSelected]);

  const submitLead = useCallback(
    async (name: string, email: string, phoneNumber: string) => {
      clearError();
      const result = await withGlobalLoading(
        () => formService.submitLead(name, email, phoneNumber),
        'Submitting lead...'
      );
      if (!isOk(result)) {
        setError(result.error);
        return;
      }
      return result.value;
    },
    [clearError]
  );

  return useMemo(
    () => ({
      formSelected,
      draftStructure,
      persistedStructure,
      error,
      computedDirty,
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
      editFormBasicInformation,
      handleGetTypesRender,
      updateRenderMode,
      canEdit,
      isPublished,
      submitLead,
    }),
    [
      formSelected,
      draftStructure,
      persistedStructure,
      error,
      computedDirty,
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
      editFormBasicInformation,
      handleGetTypesRender,
      updateRenderMode,
      canEdit,
      isPublished,
      submitLead,
    ]
  );
}
