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
    formSelected,
    setPersistedStructure,
    persistedStructure,
    setDraftStructure,
  } = useFormStore();
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      console.log('Cleaning up form selection');
      handleClearFormSelected();
    };
  }, [handleClearFormSelected]);

  const handleGetFormStructure = useCallback(async () => {
    if (!idForm) {
      setPersistedStructure([]);
      return;
    }

    const data = await getFormDetail(idForm);
    if (!data) return;

    setPersistedStructure(data.structure);
  }, [idForm, getFormDetail, setPersistedStructure]);

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
    <div className="grid h-full w-full min-w-0 grid-rows-[auto]  ">
      <div className="min-h-0 w-full min-w-0">{RenderSection}</div>
    </div>
  );
};
export default FormBuilderView;
