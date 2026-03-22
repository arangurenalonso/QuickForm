import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/common/libs/ui/button';
import { MdOutlinePublish } from 'react-icons/md';
import useFormStore from '@/modules/form/hooks/useFormStore';
import { SHOW_ERROR_TYPE } from '@/common/components/molecules/error/auth-error.enum';
import AuthErrorModalWatcher from '@/common/components/molecules/error/AuthErrorModalWatcher';
import { useToast } from '@/hooks/use-toast';
import { useBoundStore } from '@/store';
import ActionButton from '@/common/components/molecules/ActionButton';
import useDesigner from '@/modules/form/hooks/useDesigner';

type PublishFormBtnProps = {
  idForm: string;
};

const PublishFormBtn = ({ idForm }: PublishFormBtnProps) => {
  const { sections } = useDesigner();
  const { publishForm, error } = useFormStore();
  const openModal = useBoundStore((s) => s.openModal);
  const closeModal = useBoundStore((s) => s.closeModal);
  const { toast } = useToast();
  const router = useRouter();

  AuthErrorModalWatcher({
    error,
    id: 'resend-verify-email-error-modal',
    showErrorType: SHOW_ERROR_TYPE.Toast,
  });

  const handlePublishForm = useCallback(async () => {
    const modalId = 'submit-form-modal';
    const funcSubmit = async () => {
      const result = await publishForm(idForm, sections);
      if (!result) {
        closeModal(modalId);
        return;
      }
      toast({
        title: 'Success',
        description:
          result.message?.trim() ?? 'Your form is now available to the public',
      });
      closeModal(modalId);
      router.refresh();
    };

    openModal({
      id: modalId,
      title: 'Are you absolutely sure?',
      titleDescription:
        'By publishing this form you will make it available to the public and you will be able to collect submissions..',
      actions: (
        <ActionButton
          funcSave={funcSubmit}
          funcCancel={() => closeModal(modalId)}
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
