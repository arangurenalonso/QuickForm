'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/common/libs/ui/dialog';
import { cn } from '@/common/libs/utils';

import useDesigner from '@/modules/form/hooks/useDesigner';
import { useBoundStore } from '@/store';

import JsonSubmitPreviewModalContent from './JsonSubmitPreviewModalContent';
import RenderAccordionForm from '@/modules/form/components/form-render/RenderAccordionForm';
import RenderTabsForm from '@/modules/form/components/form-render/RenderTabsForm';
import RenderStepperForm from '@/modules/form/components/form-render/stepper/RenderStepperForm';
import RenderDefaultForm from '@/modules/form/components/form-render/RenderDefaultForm';
import { ModalId } from '@/modules/ui/store/modal/modal.type';
import {
  FormRenderMode,
  FORM_RENDER_MODE_OPTIONS,
} from '@/modules/form/components/form-render/type/form-rende.type';
import useFormStore from '@/modules/form/hooks/useFormStore';

const PreviewDialogBtn = () => {
  const { sections } = useDesigner();
  const { formSelected } = useFormStore();
  const openModal = useBoundStore((state) => state.openModal);

  const savedMode =
    (formSelected?.renderMode as FormRenderMode | undefined) ?? 'default';

  const [mode, setMode] = useState<FormRenderMode>(savedMode);

  useEffect(() => {
    setMode(savedMode);
  }, [savedMode]);

  const onSubmit = useCallback(
    (values: unknown) => {
      openModal({
        id: ModalId.SUBMIT_PREVIEW,
        title: 'Submit payload preview',
        titleDescription: 'This is exactly what will be sent to the API.',
        content: (
          <JsonSubmitPreviewModalContent
            modalId={ModalId.SUBMIT_PREVIEW}
            payload={values}
          />
        ),
      });
    },
    [openModal]
  );

  const FormRenderer = useMemo(() => {
    switch (mode) {
      case 'default':
        return <RenderDefaultForm sections={sections} onSubmit={onSubmit} />;
      case 'tabs':
        return <RenderTabsForm sections={sections} onSubmit={onSubmit} />;
      case 'accordion':
        return <RenderAccordionForm sections={sections} onSubmit={onSubmit} />;
      case 'stepper':
        return <RenderStepperForm sections={sections} onSubmit={onSubmit} />;
      default:
        return <RenderDefaultForm sections={sections} onSubmit={onSubmit} />;
    }
  }, [mode, sections, onSubmit]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-screen max-h-screen max-w-full flex-col gap-0 p-0">
        <div className="border-b px-5 py-4">
          <DialogTitle className="text-lg font-semibold text-foreground">
            Form preview
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            This is how your form will look to end users.
          </DialogDescription>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden bg-accent/30 bg-[url(/paper.svg)] p-4 dark:bg-[url(/paper-dark.svg)]">
          <div className="mx-auto flex h-full w-full max-w-5xl flex-col gap-4 overflow-hidden">
            <div className="qf-toolbar flex-wrap justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Preview mode
                </p>
                <p className="text-xs text-muted-foreground">
                  The saved mode is preselected, but you can preview other
                  layouts.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {FORM_RENDER_MODE_OPTIONS.map((option) => {
                  const active = mode === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMode(option.value)}
                      className={cn(
                        'rounded-xl border px-3 py-2 text-sm transition-colors',
                        active
                          ? 'border-ring bg-accent text-foreground'
                          : 'border-border bg-background text-muted-foreground hover:bg-muted'
                      )}
                    >
                      {option.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="qf-surface flex-1 overflow-auto p-4 md:p-6">
              <div className="mx-auto w-full max-w-3xl">{FormRenderer}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
