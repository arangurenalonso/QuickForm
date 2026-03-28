'use client';

import FormBuilder from '../components/form-designer/FormBuilder';
import { useCallback, useEffect, useMemo } from 'react';
import useFormStore from '../hooks/useFormStore';
import { useToast } from '@/hooks/use-toast';
import FormSettingsPage from '../components/form-setting/FormSettingsPage';
import FormPublishPage from '../components/form-publish/FormPublishPage';
import { SectionType } from '../components/form-designer/context/designer-context.type';
import useUnsavedChangesStore from '@/modules/ui/store/unsaved-changes/useUnsavedChangesStore';
import { UnsavedChangesScope } from '@/modules/ui/store/unsaved-changes/unsaved-changes.methods';
import { FormWorkspaceTab } from '../enum/form.enum';

type FormBuilderContainerProps = {
  idForm?: string | null | undefined;
  tab?: string | null | undefined;
};

const FormBuilderView = ({
  idForm,
  tab = FormWorkspaceTab.builder,
}: FormBuilderContainerProps) => {
  const {
    getFormDetail,
    error,
    handleClearFormSelected,
    setPersistedStructure,
    persistedStructure,
    setDraftStructure,
    draftStructure,
    saveFormStructure,
    computedDirty,
    canEdit,
  } = useFormStore();

  const { toast } = useToast();

  const scope = useMemo(() => {
    return UnsavedChangesScope.formBuilder(idForm);
  }, [idForm]);

  const {
    isDirty,
    setDirty,
    registerHandlers,
    unregisterHandlers,
    resetScope,
  } = useUnsavedChangesStore(scope);

  useEffect(() => {
    setDirty(computedDirty);
  }, [computedDirty, setDirty]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;

      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const handleSaveAndContinue = useCallback(async () => {
    if (!idForm) return false;

    const result = await saveFormStructure(draftStructure ?? [], idForm);
    if (!result) return false;

    setPersistedStructure(draftStructure ?? []);

    toast({
      title: 'Success',
      description: 'Form saved successfully',
    });

    return true;
  }, [idForm, saveFormStructure, draftStructure, setPersistedStructure, toast]);

  const handleDiscardAndContinue = useCallback(() => {
    setDraftStructure(persistedStructure ?? []);
  }, [setDraftStructure, persistedStructure]);

  const handleStay = useCallback(() => {}, []);

  useEffect(() => {
    registerHandlers({
      onSaveAndContinue: handleSaveAndContinue,
      onDiscardAndContinue: handleDiscardAndContinue,
      onStay: handleStay,
    });

    return () => {
      unregisterHandlers();
    };
  }, [
    registerHandlers,
    unregisterHandlers,
    handleSaveAndContinue,
    handleDiscardAndContinue,
    handleStay,
  ]);

  useEffect(() => {
    return () => {
      resetScope();
      handleClearFormSelected();
    };
  }, [resetScope, handleClearFormSelected]);

  const handleGetFormStructure = useCallback(async () => {
    if (!idForm) {
      setPersistedStructure([]);
      setDraftStructure([]);
      return;
    }

    const data = await getFormDetail(idForm);
    if (!data) return;

    setPersistedStructure(data.structure ?? []);
    setDraftStructure(data.structure ?? []);
  }, [idForm, getFormDetail, setPersistedStructure, setDraftStructure]);

  useEffect(() => {
    handleGetFormStructure();
  }, [handleGetFormStructure]);

  useEffect(() => {
    if (!error) return;

    const message = error.message ?? JSON.stringify(error);

    toast({
      title: 'Error',
      description: `Something went wrong, please try again later. ${message}`,
      variant: 'destructive',
    });
  }, [error, toast]);

  const handleOnChangeStructure = useCallback(
    (structure: SectionType[]) => {
      setDraftStructure(structure);
    },
    [setDraftStructure]
  );

  const RenderSection = useMemo(() => {
    switch (tab) {
      case FormWorkspaceTab.builder:
        return (
          <FormBuilder
            value={persistedStructure ?? []}
            onChange={handleOnChangeStructure}
            canEdit={canEdit}
          />
        );
      case FormWorkspaceTab.settings:
        return <FormSettingsPage />;
      case FormWorkspaceTab.publish:
        return <FormPublishPage />;
      default:
        return null;
    }
  }, [tab, handleOnChangeStructure, persistedStructure, canEdit]);

  return (
    <div className="grid h-full w-full min-w-0 grid-rows-[auto]">
      <div className="min-h-0 w-full min-w-0">{RenderSection}</div>
    </div>
  );
};

export default FormBuilderView;
