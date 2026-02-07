'use client';
import { useBoundStore } from '@/store';
import React from 'react';

import { Button } from '@/common/libs/ui/button';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import FormCreateForm from '../form/FormCreateForm';

const FormCreateCard = () => {
  const openModal = useBoundStore((s) => s.openModal);

  const handleOpenCreateFormModal = () => {
    const modalId = 'create-form-modal';
    openModal({
      id: modalId,
      title: 'Create new form',
      titleDescription: 'Create a new form to start collecting responses.',
      content: <FormCreateForm modalId={modalId} />,
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
