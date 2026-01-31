import { MdPreview } from 'react-icons/md';
import { Button } from '@/common/libs/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/common/libs/ui/dialog';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';

import { useBoundStore } from '@/store';
import JsonSubmitPreviewModalContent from './JsonSubmitPreviewModalContent';
import RenderTabsForm from '../../form-render/RenderTabsForm';

const PreviewDialogBtn = () => {
  const { sections } = useDesigner();

  const openModal = useBoundStore((s) => s.openModal);

  const onSubmit = (values: unknown) => {
    console.log('Preview form submitted values:', values);
    const payload = values;

    const modalId = `submit-preview-${Date.now()}`;

    openModal({
      id: modalId,
      title: 'Submit payload preview',
      titleDescription: 'This is exactly what will be sent to the API.',
      content: (
        <JsonSubmitPreviewModalContent modalId={modalId} payload={payload} />
      ),
    });
  };

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
          <div className="max-w-[620px] flex flex-col gap-6 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            <RenderTabsForm sections={sections} onSubmit={onSubmit} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
