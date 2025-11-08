'use client';

import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import useAuthStore from '../../hooks/useAuthStore';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/libs/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/common/libs/ui/input';
import { Button } from '@/common/libs/ui/button';
import AuthErrorModalWatcher from '@/common/components/molecules/error/AuthErrorModalWatcher';
import { useSearchParams } from 'next/navigation';
import InputRulesChecklist from '@/common/components/molecules/inputRule/InputRulesChecklist';
import { useState } from 'react';
import { toRHFValidate, makePasswordRules } from '../../types/auth.types';
import CustomAlert from '@/common/components/atoms/CustomAlert';
import { useBoundStore } from '@/store';

type ResetPasswordFormFormInputs = {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { openModal } = useBoundStore.getState();
  const { resetPasswordProcess, error, clearError } = useAuthStore();
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

  const form = useForm<ResetPasswordFormFormInputs>({
    defaultValues: {
      email: emailFromQuery,
      verificationCode: verificationCodeFromQuery,
      password: '',
      confirmPassword: '',
    },
  });
  const password = useWatch({ control: form.control, name: 'password' }) ?? '';

  const onSubmit: SubmitHandler<ResetPasswordFormFormInputs> = async (data) => {
    const result = await resetPasswordProcess(
      data.email,
      data.verificationCode,
      data.password,
      data.confirmPassword
    );

    if (result) {
      openModal({
        id: 'reset-password-success-modal',
        title: 'Password Reset Successful',
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

        <FormField
          control={form.control}
          name="password"
          rules={{
            required: 'Password is required',
            validate: toRHFValidate(makePasswordRules(8, '¡¿ñÑ')),
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPwd ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...field}
                    className="pr-10"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <InputRulesChecklist
                value={password}
                rules={makePasswordRules(8, '¡¿ñÑ')}
              />

              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{
            required: 'Please confirm your password',
            validate: (v) =>
              v === form.getValues('password') || 'Passwords do not match',
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...field}
                    className="pr-10"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
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
