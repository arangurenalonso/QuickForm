'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
// import clsx from 'clsx';
// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
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

// const alphaNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]+$/;
const RegisterSchema = z
  .object({
    // firstName: z
    //   .string()
    //   .trim()
    //   .min(1, 'Name is required')
    //   .regex(alphaNameRegex, 'Only letters, spaces, hyphens, and apostrophes'),
    // lastName: z
    //   .string()
    //   .trim()
    //   .min(1, 'LastName is required')
    //   .regex(alphaNameRegex, 'Only letters, spaces, hyphens, and apostrophes'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const RegisterForm = () => {
  //   const { registerProcess, errorMessage } = useAuthStore();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      //   firstName: '',
      //   lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  // Submit handler
  const onSubmit = async (data: RegisterFormInputs) => {
    console.log('RegisterForm - onSubmit data:', data);
    // NOTE: keep same payload shape you already use
    // await registerProcess({
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   password: data.password,
    //   confirmPassword: data.confirmPassword,
    //   // timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    // });
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

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
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
