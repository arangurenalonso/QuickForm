'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import useAuthStore from '../../hooks/useAuthStore';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthErrorModalWatcher from '@/common/components/molecules/error/AuthErrorModalWatcher';
import { useSearchParams } from 'next/navigation';

type EmailConfirmationFormInputs = {
  email: string;
  verificationCode: string;
};

export default function EmailConfirmation() {
  const { emailConfirmationProcess, error, clearError } = useAuthStore();
  AuthErrorModalWatcher({
    error,
    id: 'email-confirmation-error-modal',
    onClose: clearError,
  });

  const searchParams = useSearchParams();
  const emailFromQuery = (searchParams.get('email') ?? '').trim();
  const verificationCodeFromQuery = (
    searchParams.get('verification-code') ?? ''
  ).trim();

  const form = useForm<EmailConfirmationFormInputs>({
    defaultValues: {
      email: emailFromQuery,
      verificationCode: verificationCodeFromQuery,
    },
  });

  const onSubmit: SubmitHandler<EmailConfirmationFormInputs> = async (data) => {
    await emailConfirmationProcess(data.email, data.verificationCode);
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

        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your confirmation token"
                  autoComplete="one-time-code"
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
          {form.formState.isSubmitting ? 'Confirming...' : 'Confirm Email'}
        </Button>
      </form>
    </Form>
  );
}
