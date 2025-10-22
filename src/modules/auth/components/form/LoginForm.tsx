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
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { signInProcess, errorMessage } = useAuthStore();
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    console.log('LoginForm - errorMessage:', errorMessage);
  }, [errorMessage]);

  const form = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await signInProcess(data.email, data.password);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
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

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Logging in…' : 'Login'}
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

export default LoginForm;
