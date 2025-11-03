'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import AuthErrorModalWatcher from '@/common/components/molecules/error/AuthErrorModalWatcher';
import useAuthStore from '../../hooks/useAuthStore';
import CustomAlert from '@/common/components/atoms/CustomAlert';
import { useBoundStore } from '@/store';

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address'),
});

type ForgotPasswordFormInputs = {
  email: string;
};
const ForgotPasswordForm = () => {
  const { forgotPasswordProcess, error, clearError } = useAuthStore();
  AuthErrorModalWatcher({
    error,
    id: 'email-confirmation-error-modal',
    onClose: clearError,
  });
  const { openModal } = useBoundStore.getState();

  const form = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    const result = await forgotPasswordProcess(data.email);

    if (result) {
      openModal({
        id: 'resend-verification-success-modal',
        title: 'Verification Email Sent',
        content: (
          <CustomAlert
            variant="success"
            message={result.message}
            redirectUrl={result.redirectUrl}
          />
        ),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? 'Sending Email...'
            : 'Get new password'}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
