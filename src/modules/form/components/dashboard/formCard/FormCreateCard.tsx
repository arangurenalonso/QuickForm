'use client';
import React from 'react';
import useFormStore from '@/modules/form/hooks/useFormStore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/common/libs/ui/button';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import FormEditorForm, { FormCreatedValues } from '../form/FormEditorForm';
import { useRouter } from 'next/navigation';
import useAuthErrorModalWatcher from '@/common/components/molecules/error/useAuthErrorModalWatcher';
import { ModalErrorType, ModalId } from '@/modules/ui/store/modal/modal.type';
import useModalhook from '@/modules/ui/store/modal/useModalhook';

const FormCreateCard = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModalhook();
  const { toast } = useToast();

  const { createFormProcess, error } = useFormStore();

  useAuthErrorModalWatcher({ error, id: ModalErrorType.CREATE_FORM_ERROR });

  const handleOpenCreateFormModal = () => {
    const handleSubmit = async (values: FormCreatedValues) => {
      const res = await createFormProcess(values.name, values.description);

      if (!res) {
        return;
      }

      const url = `/builder/${res.data}`;
      toast({
        title: 'Success',
        description: 'Form created successfully',
      });

      router.push(url);
      closeModal(ModalId.CREATE_FORM);
    };

    openModal({
      id: ModalId.CREATE_FORM,
      title: 'Create new form',
      titleDescription: 'Create a new form to start collecting responses.',
      content: (
        <FormEditorForm
          submitCallback={handleSubmit}
          cancelCallback={() => closeModal(ModalId.CREATE_FORM)}
        />
      ),
    });
  };

  return (
    <Button
      variant="outline"
      className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
      onClick={handleOpenCreateFormModal}
    >
      <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
      <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
        Create new form
      </p>
    </Button>
  );
};

export default FormCreateCard;
