'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/libs/ui/form';
import { Input } from '@/common/libs/ui/input';
import { Textarea } from '@/common/libs/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/common/libs/ui/button';
import { ImSpinner2 } from 'react-icons/im';

export type FormCreatedValues = {
  name: string;
  description?: string | undefined;
};

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(250, 'Description must be at most 250 characters'),
});

type FormEditorFormProps = {
  initialValues?: FormCreatedValues;
  canEdit?: boolean;
  submitCallback?: (values: FormCreatedValues) => void | Promise<void>;
  cancelCallback?: () => void;
};

const emptyValues: FormCreatedValues = {
  name: '',
  description: '',
};

const FormEditorForm = ({
  initialValues,
  canEdit = true,
  submitCallback,
  cancelCallback,
}: FormEditorFormProps) => {
  const form = useForm<FormCreatedValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? emptyValues,
  });

  useEffect(() => {
    form.reset(initialValues ?? emptyValues);
  }, [initialValues, form]);

  const onSubmit = async (values: FormCreatedValues) => {
    if (!canEdit) return;

    if (submitCallback) {
      await submitCallback(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          disabled={!canEdit}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} readOnly={!canEdit} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          disabled={!canEdit}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} readOnly={!canEdit} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          {cancelCallback && (
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={cancelCallback}
            >
              Close
            </Button>
          )}

          {canEdit && (
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {!form.formState.isSubmitting ? (
                <span>Save</span>
              ) : (
                <ImSpinner2 className="animate-spin" />
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default FormEditorForm;
