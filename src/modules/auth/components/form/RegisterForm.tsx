'use client';

import { useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/common/libs/ui/input';
import { Button } from '@/common/libs/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/libs/ui/form';
import useAuthStore from '../../hooks/useAuthStore';
import { useBoundStore } from '@/store';
import { makePasswordRules, toRHFValidate } from '../../types/auth.types';
import InputRulesChecklist from '@/common/components/molecules/inputRule/InputRulesChecklist';
import CustomAlert from '@/common/components/atoms/CustomAlert';
import AuthErrorModalWatcher from '@/common/components/molecules/error/AuthErrorModalWatcher';

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
const RegisterForm = () => {
  const { signUpProcess, error, clearError } = useAuthStore();
  const { openModal } = useBoundStore.getState();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<RegisterFormInputs>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });
  const password = useWatch({ control: form.control, name: 'password' }) ?? '';

  AuthErrorModalWatcher({
    error,
    id: 'register-error-modal',
    onClose: clearError,
  });
  const onSubmit = async (data: RegisterFormInputs) => {
    const result = await signUpProcess(
      data.email,
      data.password,
      data.confirmPassword
    );
    if (result) {
      openModal({
        id: 'Successful-Registration-Modal',
        title: 'User created successfully',
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
          rules={{}}
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
          {form.formState.isSubmitting ? 'Signing up…' : 'Sign Up'}
        </Button>

        {/* {!!errorMessage?.length && (
            <>
              <Separator className="my-2" />
              <Alert variant="destructive">
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription className="space-y-1">
                  {errorMessage.map((e: string, i: number) => (
                    <div key={i}>- {e}</div>
                  ))}
                </AlertDescription>
              </Alert>
            </>
          )} */}
      </form>
    </Form>
  );
};

export default RegisterForm;
