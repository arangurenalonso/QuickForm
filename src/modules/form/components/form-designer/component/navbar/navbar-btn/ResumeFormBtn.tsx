import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { PlayCircle } from 'lucide-react';

import { Button } from '@/common/libs/ui/button';
import useFormStore from '@/modules/form/hooks/useFormStore';
import { SHOW_ERROR_TYPE } from '@/common/components/molecules/error/auth-error.enum';
import { useToast } from '@/hooks/use-toast';
import ActionButton from '@/common/components/molecules/ActionButton';
import useAuthErrorModalWatcher from '@/common/components/molecules/error/useAuthErrorModalWatcher';
import useModalhook from '@/modules/ui/store/modal/useModalhook';
import { ModalErrorType, ModalId } from '@/modules/ui/store/modal/modal.type';

type ResumeFormBtnProps = {
  idForm: string;
};

const ResumeFormBtn = ({ idForm }: ResumeFormBtnProps) => {
  const { resumeForm, error } = useFormStore();
  const { openModal, closeModal } = useModalhook();
  const { toast } = useToast();
  const router = useRouter();

  useAuthErrorModalWatcher({
    error,
    id: ModalErrorType.RESUME_FORM_ERROR,
    showErrorType: SHOW_ERROR_TYPE.Toast,
  });

  const handleResumeForm = useCallback(() => {
    const funcSubmit = async () => {
      const result = await resumeForm(idForm);

      if (!result) {
        closeModal(ModalId.RESUME_FORM);
        return;
      }

      toast({
        title: 'Success',
        description:
          result.message?.trim() ?? 'Your form is accepting submissions again.',
      });

      closeModal(ModalId.RESUME_FORM);
      router.refresh();
    };

    openModal({
      id: ModalId.RESUME_FORM,
      title: 'Resume this form?',
      titleDescription:
        'By resuming this form, users will be able to submit responses again.',
      actions: (
        <ActionButton
          funcSave={funcSubmit}
          funcCancel={() => closeModal(ModalId.RESUME_FORM)}
          isSubmitting={false}
        />
      ),
    });
  }, [idForm, resumeForm, toast, router, openModal, closeModal]);

  return (
    <Button type="button" className="gap-2" onClick={handleResumeForm}>
      <PlayCircle className="h-4 w-4" />
      Resume
    </Button>
  );
};

export default ResumeFormBtn;
