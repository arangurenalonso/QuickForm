'use client';

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
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { Button } from '@/common/libs/ui/button';
import { ImSpinner2 } from 'react-icons/im';
import { useBoundStore } from '@/store';
import useFormStore from '@/modules/formbuilder/hooks/useFormStore';

export type FormCreatedValues = {
  name: string;
  description?: string;
};

const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
});
type formSchemaType = z.infer<typeof formSchema>;

type FormCreateFormProps = {
  modalId: string;
};

const FormCreateForm = ({ modalId }: FormCreateFormProps) => {
  const { createFormProcess } = useFormStore();
  const form = useForm<FormCreatedValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', description: '' },
  });

  const closeModal = useBoundStore((s) => s.closeModal);
  const { toast } = useToast();

  const onSubmit = async (values: formSchemaType) => {
    try {
      const res = await createFormProcess(values.name, values.description);
      if (!res) {
        throw new Error('Form creation failed');
      }
      const formId = res.message;
      toast({
        title: 'Success',
        description: 'Form created successfully',
      });
      console.log({ formId });

      closeModal(modalId);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: `Something went wrong, please try again later ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea rows={5} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex space-x-4">
        <Button
          variant="secondary"
          className="w-full mt-4"
          onClick={() => closeModal(modalId)}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            form.handleSubmit(onSubmit)();
          }}
          disabled={form.formState.isSubmitting}
          className="w-full mt-4"
        >
          {!form.formState.isSubmitting ? (
            <span>Save</span>
          ) : (
            <ImSpinner2 className="animate-spin" />
          )}
        </Button>
      </div>
    </Form>
  );
};

export default FormCreateForm;
