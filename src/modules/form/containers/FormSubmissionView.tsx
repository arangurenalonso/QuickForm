'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import RenderAccordionForm from '@/modules/form/components/form-render/RenderAccordionForm';
import RenderTabsForm from '@/modules/form/components/form-render/RenderTabsForm';
import RenderStepperForm from '@/modules/form/components/form-render/stepper/RenderStepperForm';
import useFormStore from '../hooks/useFormStore';
import { SectionType } from '../components/form-designer/context/designer-context.type';
import { FormType } from '../types/form.types';
import { Alert } from '@/common/libs/ui/alert';

type PreviewMode = 'tabs' | 'accordion' | 'stepper';
type FormSubmissionViewProps = {
  idForm?: string | null | undefined;
};
const FormSubmissionView = ({ idForm }: FormSubmissionViewProps) => {
  const [sections, setSections] = useState<SectionType[]>([]);
  const [form, setForm] = useState<FormType | null>(null);

  const [mode, setMode] = useState<PreviewMode>('tabs');
  const { getFormForSubmission, error } = useFormStore();

  const handleGetFormStructure = useCallback(async () => {
    if (!idForm) {
      setSections([]);
      return;
    }

    const data = await getFormForSubmission(idForm);
    if (!data) return;

    setSections(data.structure);
  }, [idForm, getFormForSubmission]);

  useEffect(() => {
    handleGetFormStructure();
  }, [handleGetFormStructure]);

  const onSubmit = useCallback((values: unknown) => {
    console.log('Form submitted with values:', values);
  }, []);

  const FormRenderer = useMemo(() => {
    switch (mode) {
      case 'tabs':
        return <RenderTabsForm sections={sections} onSubmit={onSubmit} />;
      case 'accordion':
        return <RenderAccordionForm sections={sections} onSubmit={onSubmit} />;
      case 'stepper':
        return <RenderStepperForm sections={sections} onSubmit={onSubmit} />;
      default:
        return <RenderTabsForm sections={sections} onSubmit={onSubmit} />;
    }
  }, [mode, sections, onSubmit]);

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-2xl px-4 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* {loading && <Spinner />} */}

            {(error || !form) && (
              <Alert variant="error">
                {error?.message ?? 'Form not found.'}
              </Alert>
            )}
            {/* 
            {!loading && form && submitState === 'success' && (
              <Alert variant="success">Thanks! Your submission was sent.</Alert>
            )} */}

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
        </div>
      </div>
    </>
  );
};

export default FormSubmissionView;
