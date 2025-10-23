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

const RegisterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address'),
});

type RegisterFormInputs = {
  email: string;
};
const ForgotPasswordForm = () => {
  //   const { registerProcess, errorMessage } = useAuthStore();

  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

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
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? 'Sending Email...'
            : 'Get new password'}
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

export default ForgotPasswordForm;
