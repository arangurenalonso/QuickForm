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
import useFormStore from '@/modules/form/hooks/useFormStore';
import { useRouter } from 'next/navigation';

export type FormCreatedValues = {
  name: string;
  description?: string;
};

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(250),
});

type FormCreateFormProps = {
  modalId: string;
};

const FormCreateForm = ({ modalId }: FormCreateFormProps) => {
  const { createFormProcess } = useFormStore();
  const closeModal = useBoundStore((s) => s.closeModal);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormCreatedValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', description: '' },
  });

  const onSubmit = async () => {
    try {
      const res = await createFormProcess(
        form.getValues().name,
        form.getValues().description
      );

      if (!res?.isSuccess || !res?.data) {
        throw new Error(res?.message || 'Form creation failed');
      }

      const url = `/dashboard/builder/${res.data}`;

      router.prefetch(url);
      toast({
        title: 'Success',
        description: 'Form created successfully',
      });

      closeModal(modalId);
      router.push(url);
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => closeModal(modalId)}
          >
            Close
          </Button>

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
        </div>
      </form>
    </Form>
  );
};

export default FormCreateForm;
