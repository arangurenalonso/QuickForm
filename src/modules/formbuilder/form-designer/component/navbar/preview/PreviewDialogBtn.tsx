'use client';

import { useMemo, useState } from 'react';
import { MdPreview } from 'react-icons/md';
import { Button } from '@/common/libs/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/common/libs/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/libs/ui/tabs';

import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { useBoundStore } from '@/store';

import JsonSubmitPreviewModalContent from './JsonSubmitPreviewModalContent';
import RenderTabsForm from '../../form-render/RenderTabsForm';
import RenderAccordionForm from '../../form-render/RenderAccordionForm';
import RenderStepperForm from '../../form-render/stepper/RenderStepperForm';

type PreviewMode = 'tabs' | 'accordion' | 'stepper';

const PreviewDialogBtn = () => {
  const { sections } = useDesigner();
  const openModal = useBoundStore((s) => s.openModal);

  const [mode, setMode] = useState<PreviewMode>('tabs');

  const onSubmit = (values: unknown) => {
    const modalId = `submit-preview-${Date.now()}`;

    openModal({
      id: modalId,
      title: 'Submit payload preview',
      titleDescription: 'This is exactly what will be sent to the API.',
      content: (
        <JsonSubmitPreviewModalContent modalId={modalId} payload={values} />
      ),
    });
  };

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
  }, [mode, sections]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <DialogTitle className="px-4 py-2 text-lg font-bold text-muted-foreground">
          Form preview
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground px-4">
          This is how your form will look like to your users.
        </DialogDescription>

        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <div className="max-w-[720px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {/* ✅ selector */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as PreviewMode)}>
              <TabsList className="w-full">
                <TabsTrigger value="tabs" className="flex-1">
                  Tabs
                </TabsTrigger>
                <TabsTrigger value="accordion" className="flex-1">
                  Accordion
                </TabsTrigger>
                <TabsTrigger value="stepper" className="flex-1">
                  Stepper
                </TabsTrigger>
              </TabsList>

              {/* Render solo el seleccionado */}
              <TabsContent value={mode} className="mt-6">
                {FormRenderer}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
