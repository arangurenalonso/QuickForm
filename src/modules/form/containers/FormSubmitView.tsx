'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useFormStore from '../hooks/useFormStore';
import { FormType } from '../types/form.types';
import { Alert } from '@/common/libs/ui/alert';
import { useBoundStore } from '@/store';
import FormSubmissionSkeleton from './FormSkeleton';
import { SectionType } from '../components/form-designer/context/designer-context.type';
import FormPreviewRenderer from '../components/form-render/FormPreviewRenderer';
import { SHOW_ERROR_TYPE } from '@/common/components/molecules/error/auth-error.enum';
import useAuthErrorModalWatcher from '@/common/components/molecules/error/useAuthErrorModalWatcher';
import { ModalErrorType } from '@/modules/ui/store/modal/modal.type';
import { useRouter } from 'next/navigation';
import FormUnavailableState from '../components/submit-form/FormUnavailableState';

type FormSubmitViewProps = {
  idForm?: string | null | undefined;
};
const FormSubmitView = ({ idForm }: FormSubmitViewProps) => {
  const router = useRouter();
  const isLoading = useBoundStore((s) => s.isLoading);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [form, setForm] = useState<FormType | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(false);

  // const [mode, setMode] = useState<PreviewMode>('tabs');
  const { getFormTemplate, error, submitForm } = useFormStore();

  useAuthErrorModalWatcher({
    error,
    id: ModalErrorType.SUBMIT_FORM_ERROR,
    showErrorType: SHOW_ERROR_TYPE.Modal,
  });

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

  const onSubmit = useCallback(
    (values: unknown) => {
      if (!form) return;

      const result = submitForm(form.id, values);
      if (!result) {
        return;
      }
      router.push(`/fill-form/${form.id}/success`);
    },
    [form, submitForm, router]
  );

  const FormRenderer = useMemo(() => {
    return (
      <FormPreviewRenderer
        mode={form?.renderMode}
        sections={sections}
        onSubmit={onSubmit}
        showInstruction={false}
      />
    );
  }, [sections, onSubmit, form]);

  const isPublished = useMemo(() => {
    const normalizedStatus = form?.status?.name?.trim().toLowerCase();
    return normalizedStatus === 'published';
  }, [form]);

  return (
    <div className="flex min-h-dvh w-full bg-background">
      <div className="mx-auto flex-1 w-full max-w-7xl px-4 py-10">
        <div className="h-full w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
          {isLoading && showSkeleton ? (
            <div className="flex h-full w-full items-center justify-center">
              <FormSubmissionSkeleton />
            </div>
          ) : (
            <div>
              {(error || !form) && (
                <Alert variant="error">
                  {error?.message ?? 'Form not found.'}
                </Alert>
              )}
              {form && !isPublished && (
                <FormUnavailableState
                  formName={form.name}
                  status={form.status}
                />
              )}
              {form && isPublished && (
                <>
                  <h1 className="text-2xl font-semibold text-foreground">
                    {form.name}
                  </h1>

                  {form.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
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
  );
};

export default FormSubmitView;
