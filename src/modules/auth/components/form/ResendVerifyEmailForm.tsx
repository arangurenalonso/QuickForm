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
} from '@/common/libs/ui/form';
import { Input } from '@/common/libs/ui/input';
import { Button } from '@/common/libs/ui/button';
import AuthErrorModalWatcher from '@/common/components/molecules/error/AuthErrorModalWatcher';
import { useSearchParams } from 'next/navigation';
import CustomAlert from '@/common/components/atoms/CustomAlert';
import { useBoundStore } from '@/store';

type ResendVerifyEmailFormInputs = {
  email: string;
};

const ResendVerifyEmailForm = () => {
  const { resendVerificationEmailProcess, error } = useAuthStore();
  const { openModal } = useBoundStore.getState();

  const searchParams = useSearchParams();
  const emailFromQuery = (searchParams.get('email') ?? '').trim();

  const form = useForm<ResendVerifyEmailFormInputs>({
    defaultValues: { email: emailFromQuery },
  });

  const onSubmit: SubmitHandler<ResendVerifyEmailFormInputs> = async (data) => {
    const result = await resendVerificationEmailProcess(data.email);

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

  AuthErrorModalWatcher({ error, id: 'resend-verify-email-error-modal' });

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
          {form.formState.isSubmitting ? 'Sending…' : 'Send Verification Email'}
        </Button>
      </form>
    </Form>
  );
};

export default ResendVerifyEmailForm;
