'use client';
import { useBoundStore } from '@/store';
import React from 'react';

import { Button } from '@/common/libs/ui/button';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import FormCreateForm, { FormCreatedValues } from '../form/FormCreateForm';
import { ImSpinner2 } from 'react-icons/im';

const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
});
type formSchemaType = z.infer<typeof formSchema>;

const FormCreateCard = () => {
  const openModal = useBoundStore((s) => s.openModal);
  const closeModal = useBoundStore((s) => s.closeModal);

  const { toast } = useToast();

  const form = useForm<FormCreatedValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', description: '' },
  });

  const onSubmit = async (values: formSchemaType) => {
    try {
      console.log('Function not implemented.', values);
      throw new Error('Function not implemented.');
      //   const formId = await CreateForm(values);
      //   toast({
      //     title: 'Success',
      //     description: 'Form created successfully',
      //   });
      //   router.push(`/forms/${formId}`);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: `Something went wrong, please try again later ${error}`,
        variant: 'destructive',
      });
    }
  };

  const handleOpenCreateFormModal = () => {
    const modalId = 'create-form-modal';

    openModal({
      id: modalId,
      title: 'Create new form',
      titleDescription: 'Create a new form to start collecting responses.',
      content: (
        <FormProvider {...form}>
          <FormCreateForm onSubmit={onSubmit} />
        </FormProvider>
      ),
      actions: (
        <>
          <Button
            variant="secondary"
            className="w-full mt-4"
            onClick={() => closeModal(modalId)}
          >
            Close
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {!form.formState.isSubmitting ? (
              <span>Save</span>
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </>
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
