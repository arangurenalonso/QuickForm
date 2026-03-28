'use client';

import { useCallback } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/common/libs/ui/dialog';

import useFormStore from '@/modules/form/hooks/useFormStore';
import { useBoundStore } from '@/store';

import JsonSubmitPreviewModalContent from './JsonSubmitPreviewModalContent';
import FormPreviewRenderer from '@/modules/form/components/form-render/FormPreviewRenderer';
import { ModalId } from '@/modules/ui/store/modal/modal.type';

const PreviewDialogBtn = () => {
  const { formSelected, draftStructure } = useFormStore();
  const openModal = useBoundStore((s) => s.openModal);

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
            Previewing the selected render type:{' '}
            {formSelected?.renderMode?.keyName}
          </DialogDescription>
        </div>

        <div className="flex flex-1 overflow-auto bg-accent/30 bg-[url(/paper.svg)] p-4 dark:bg-[url(/paper-dark.svg)]">
          <div className="mx-auto w-full max-w-4xl">
            <div className="qf-surface p-4 md:p-6">
              <FormPreviewRenderer
                mode={formSelected?.renderMode}
                sections={draftStructure}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
