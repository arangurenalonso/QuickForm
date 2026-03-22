'use client';
import FormBuilder from '../components/form-designer/FormBuilder';
import { FormWorkspaceTab } from '../types/form.types';
import { useCallback, useEffect, useMemo } from 'react';
import useFormStore from '../hooks/useFormStore';
import { useToast } from '@/hooks/use-toast';
import useDesigner from '@/modules/form/hooks/useDesigner';

type FormBuilderContainerProps = {
  idForm?: string | null | undefined;
  tab?: string | null | undefined;
};

const FormBuilderView = ({
  idForm,
  tab = FormWorkspaceTab.builder,
}: FormBuilderContainerProps) => {
  const { getFormDetail, error, handleClearFormSelected } = useFormStore();
  const { setFormStructure } = useDesigner();
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      console.log('Cleaning up form selection');
      handleClearFormSelected();
    };
  }, [handleClearFormSelected]);

  const handleGetFormStructure = useCallback(async () => {
    if (!idForm) {
      setFormStructure([]);
      return;
    }

    const data = await getFormDetail(idForm);
    if (!data) return;

    setFormStructure(data.structure);
  }, [idForm, getFormDetail, setFormStructure]);

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
  const RenderSection = useMemo(() => {
    switch (tab) {
      case FormWorkspaceTab.builder:
        return <FormBuilder />;
      case FormWorkspaceTab.settings:
        return <div>Settings</div>;
      case FormWorkspaceTab.publish:
        return <div>Publish</div>;
      default:
        return <FormBuilder />;
    }
  }, [tab]);

  return (
    <div className="grid h-full w-full min-w-0 grid-rows-[auto]  ">
      {/* <NavbarDesigner /> */}
      <div className="min-h-0 w-full min-w-0">{RenderSection}</div>
    </div>
  );
};
export default FormBuilderView;
