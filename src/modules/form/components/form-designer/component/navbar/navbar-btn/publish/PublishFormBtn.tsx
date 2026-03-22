import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/common/libs/ui/button';
import { MdOutlinePublish } from 'react-icons/md';
import useFormStore from '@/modules/form/hooks/useFormStore';
import { SHOW_ERROR_TYPE } from '@/common/components/molecules/error/auth-error.enum';
import { useToast } from '@/hooks/use-toast';
import ActionButton from '@/common/components/molecules/ActionButton';
import useDesigner from '@/modules/form/hooks/useDesigner';
import useAuthErrorModalWatcher from '@/common/components/molecules/error/useAuthErrorModalWatcher';
import useModalhook from '@/modules/ui/store/modal/useModalhook';
import { ModalErrorType, ModalId } from '@/modules/ui/store/modal/modal.type';

type PublishFormBtnProps = {
  idForm: string;
};

const PublishFormBtn = ({ idForm }: PublishFormBtnProps) => {
  const { sections } = useDesigner();
  const { publishForm, error } = useFormStore();
  const { openModal, closeModal } = useModalhook();
  const { toast } = useToast();
  const router = useRouter();

  useAuthErrorModalWatcher({
    error,
    id: ModalErrorType.PUBLISH_FORM_ERROR,
    showErrorType: SHOW_ERROR_TYPE.Toast,
  });

  const handlePublishForm = useCallback(async () => {
    const funcSubmit = async () => {
      const result = await publishForm(idForm, sections);
      if (!result) {
        closeModal(ModalId.SUBMIT_FORM);
        return;
      }
      toast({
        title: 'Success',
        description:
          result.message?.trim() ?? 'Your form is now available to the public',
      });
      closeModal(ModalId.SUBMIT_FORM);
      router.refresh();
    };

    openModal({
      id: ModalId.SUBMIT_FORM,
      title: 'Are you absolutely sure?',
      titleDescription:
        'By publishing this form you will make it available to the public and you will be able to collect submissions..',
      actions: (
        <ActionButton
          funcSave={funcSubmit}
          funcCancel={() => closeModal(ModalId.SUBMIT_FORM)}
          isSubmitting={false}
        />
      ),
    });
  }, [idForm, publishForm, toast, router, openModal, closeModal, sections]);

  return (
    <Button
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
      onClick={handlePublishForm}
    >
      <MdOutlinePublish className="h-4 w-4" />
      Publish
    </Button>
  );
};

export default PublishFormBtn;
