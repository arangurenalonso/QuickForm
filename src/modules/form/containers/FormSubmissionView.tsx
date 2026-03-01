'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import RenderTabsForm from '@/modules/form/components/form-render/RenderTabsForm';
import useFormStore from '../hooks/useFormStore';
import { SectionType } from '../components/form-designer/context/designer-context.type';
import { FormType } from '../types/form.types';
import { Alert } from '@/common/libs/ui/alert';
import { useBoundStore } from '@/store';
import FormSubmissionSkeleton from './FormSkeleton';
type FormSubmissionViewProps = {
  idForm?: string | null | undefined;
};
const FormSubmissionView = ({ idForm }: FormSubmissionViewProps) => {
  const isLoading = useBoundStore((s) => s.isLoading);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [form, setForm] = useState<FormType | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(false);

  // const [mode, setMode] = useState<PreviewMode>('tabs');
  const { getFormTemplate, error } = useFormStore();

  const handleGetFormStructure = useCallback(async () => {
    setShowSkeleton(true);
    if (!idForm) {
      setSections([]);
      setShowSkeleton(false);
      return;
    }

    const data = await getFormTemplate(idForm);
    if (!data) {
      setShowSkeleton(false);
      return;
    }

    setSections(data.sections);
    setForm(data.form);
    setShowSkeleton(false);
  }, [idForm, getFormTemplate]);

  useEffect(() => {
    handleGetFormStructure();
  }, [handleGetFormStructure]);

  const onSubmit = useCallback((values: unknown) => {
    console.log('Form submitted with values:', values);
  }, []);

  const FormRenderer = useMemo(() => {
    return <RenderTabsForm sections={sections} onSubmit={onSubmit} />;
    // switch (mode) {
    //   case 'tabs':
    //     return <RenderTabsForm sections={sections} onSubmit={onSubmit} />;
    //   case 'accordion':
    //     return <RenderAccordionForm sections={sections} onSubmit={onSubmit} />;
    //   case 'stepper':
    //     return <RenderStepperForm sections={sections} onSubmit={onSubmit} />;
    //   default:
    //     return <RenderTabsForm sections={sections} onSubmit={onSubmit} />;
    // }
  }, [sections, onSubmit]);

  return (
    <>
      <div className="w-full min-h-dvh flex bg-slate-50 ">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 flex-1">
          <div className="w-full h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ">
            {isLoading && showSkeleton ? (
              <div className="w-full h-full flex items-center justify-center">
                <FormSubmissionSkeleton />
              </div>
            ) : (
              <div className="">
                {(error || !form) && (
                  <Alert variant="error">
                    {error?.message ?? 'Form not found.'}
                  </Alert>
                )}
                {form && (
                  <>
                    <h1 className="text-2xl font-semibold text-slate-900">
                      {form.name}
                    </h1>

                    {form.description && (
                      <p className="mt-2 text-sm text-slate-600">
                        {form.description}
                      </p>
                    )}

                    <div className="mt-4">{FormRenderer}</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSubmissionView;
