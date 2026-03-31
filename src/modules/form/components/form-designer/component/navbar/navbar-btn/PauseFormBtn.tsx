import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { PauseCircle } from 'lucide-react';

import { Button } from '@/common/libs/ui/button';
import useFormStore from '@/modules/form/hooks/useFormStore';
import { SHOW_ERROR_TYPE } from '@/common/components/molecules/error/auth-error.enum';
import { useToast } from '@/hooks/use-toast';
import ActionButton from '@/common/components/molecules/ActionButton';
import useAuthErrorModalWatcher from '@/common/components/molecules/error/useAuthErrorModalWatcher';
import useModalhook from '@/modules/ui/store/modal/useModalhook';
import { ModalErrorType, ModalId } from '@/modules/ui/store/modal/modal.type';

type PauseFormBtnProps = {
  idForm: string;
};

const PauseFormBtn = ({ idForm }: PauseFormBtnProps) => {
  const { pauseForm, error } = useFormStore();
  const { openModal, closeModal } = useModalhook();
  const { toast } = useToast();
  const router = useRouter();

  useAuthErrorModalWatcher({
    error,
    id: ModalErrorType.PAUSE_FORM_ERROR,
    showErrorType: SHOW_ERROR_TYPE.Toast,
  });

  const handlePauseForm = useCallback(() => {
    const funcSubmit = async () => {
      const result = await pauseForm(idForm);

      if (!result) {
        closeModal(ModalId.PAUSE_FORM);
        return;
      }

      toast({
        title: 'Success',
        description:
          result.message?.trim() ??
          'Your form has been paused. New submissions are no longer allowed.',
      });

      closeModal(ModalId.PAUSE_FORM);
      router.refresh();
    };

    openModal({
      id: ModalId.PAUSE_FORM,
      title: 'Pause this form?',
      titleDescription:
        'When this form is paused, users will still be able to open it, but they will not be able to submit new responses.',
      actions: (
        <ActionButton
          funcSave={funcSubmit}
          funcCancel={() => closeModal(ModalId.PAUSE_FORM)}
          isSubmitting={false}
        />
      ),
    });
  }, [idForm, pauseForm, toast, router, openModal, closeModal]);

  return (
    <Button
      type="button"
      variant="outline"
      className="gap-2"
      onClick={handlePauseForm}
    >
      <PauseCircle className="h-4 w-4" />
      Pause
    </Button>
  );
};

export default PauseFormBtn;
