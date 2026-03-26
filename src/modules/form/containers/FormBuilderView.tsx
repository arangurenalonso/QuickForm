'use client';
import FormBuilder from '../components/form-designer/FormBuilder';
import { FormWorkspaceTab } from '../types/form.types';
import { useCallback, useEffect, useMemo } from 'react';
import useFormStore from '../hooks/useFormStore';
import { useToast } from '@/hooks/use-toast';
import FormSettingsPage from '../components/form-setting/FormSettingsPage';
import FormPublishPage from '../components/form-publish/FormPublishPage';
import { FORM_ACTION } from '../enum/form.enum';
import { SectionType } from '../components/form-designer/context/designer-context.type';
import useUnsavedChangesGuard from '@/hooks/useUnsavedChangeGuard';
import UnsavedChangesDialog from '@/hooks/UnsavedChangesDialog';
import FormWorkspaceTabs from '../components/navbar/FormWorkspaceTabs';
import { useRouter } from 'next/navigation';

type FormBuilderContainerProps = {
  idForm?: string | null | undefined;
  tab?: string | null | undefined;
};

const FormBuilderView = ({
  idForm,
  tab = FormWorkspaceTab.builder,
}: FormBuilderContainerProps) => {
  const router = useRouter();
  const {
    getFormDetail,
    error,
    handleClearFormSelected,
    formSelected,
    setPersistedStructure,
    persistedStructure,
    setDraftStructure,
    draftStructure,
    saveFormStructure,
    isDirty,
  } = useFormStore();

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

  const { toast } = useToast();

  const handleSave = useCallback(async () => {
    if (!idForm) return false;
    const result = await saveFormStructure(draftStructure ?? [], idForm);
    if (!result) {
      return false;
    }
    toast({
      title: 'Success',
      description: 'Form saved successfully',
    });
    return true;
  }, [idForm, saveFormStructure, draftStructure, toast]);

  const {
    open,
    requestAction,
    handleCancel,
    handleConfirmSave,
    handleConfirmDiscard,
  } = useUnsavedChangesGuard({
    isDirty,
    onSave: handleSave,
  });
  const handleBeforeTabChange = useCallback(
    (nextUrl: string) => {
      requestAction(() => {
        router.push(nextUrl);
      });
    },
    [requestAction, router]
  );
  useEffect(() => {
    return () => {
      console.log('Cleaning up form selection');
      handleClearFormSelected();
    };
  }, [handleClearFormSelected]);

  const handleGetFormStructure = useCallback(async () => {
    if (!idForm) {
      setPersistedStructure([]);
      setDraftStructure([]);
      return;
    }

    const data = await getFormDetail(idForm);
    if (!data) return;

    setPersistedStructure(data.structure);
    setDraftStructure(data.structure);
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
            canEdit={
              formSelected?.status.allowedActions.includes(FORM_ACTION.Edit) ??
              false
            }
          />
        );
      case FormWorkspaceTab.settings:
        return <FormSettingsPage />;
      case FormWorkspaceTab.publish:
        return <FormPublishPage />;
      default:
        return <></>;
    }
  }, [tab, persistedStructure, formSelected, handleOnChangeStructure]);

  return (
    <>
      {formSelected && (
        <FormWorkspaceTabs
          basePath={`/builder/${formSelected.id}`}
          onBeforeTabChange={handleBeforeTabChange}
        />
      )}
      <div className="border-b" />
      <div className="grid h-full w-full min-w-0 grid-rows-[auto]  ">
        <div className="min-h-0 w-full min-w-0">{RenderSection}</div>
      </div>
      <UnsavedChangesDialog
        open={open}
        onStay={handleCancel}
        onSaveAndContinue={handleConfirmSave}
        onDiscardAndContinue={handleConfirmDiscard}
      />
    </>
  );
};
export default FormBuilderView;
