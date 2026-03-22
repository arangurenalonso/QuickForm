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
import { z } from 'zod';
import { Button } from '@/common/libs/ui/button';
import { ImSpinner2 } from 'react-icons/im';

export type FormCreatedValues = {
  name: string;
  description: string;
};

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(250),
});

type FormEditorFormProps = {
  submitCallback?: (values: FormCreatedValues) => void;
  cancelCallback?: () => void;
};

const FormEditorForm = ({
  submitCallback,
  cancelCallback,
}: FormEditorFormProps) => {
  const form = useForm<FormCreatedValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', description: '' },
  });

  const onSubmit = async () => {
    if (submitCallback) {
      await submitCallback(form.getValues());
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
          {cancelCallback && (
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => {
                if (cancelCallback) {
                  cancelCallback();
                }
              }}
            >
              Close
            </Button>
          )}

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

export default FormEditorForm;
