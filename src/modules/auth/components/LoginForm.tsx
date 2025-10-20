'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import useAuthStore from '../hooks/useAuthStore';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { signInProcess, errorMessage } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await signInProcess(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`block w-full rounded-md border px-3 py-2 outline-none transition focus:ring-2 ${
            errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-black/50 dark:focus:ring-white/60'
          }`}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`block w-full rounded-md border px-3 py-2 outline-none transition focus:ring-2 ${
            errors.password
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-black/50 dark:focus:ring-white/60'
          }`}
          placeholder="********"
          aria-invalid={!!errors.password}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2 font-medium text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      {/* Error global */}
      {errorMessage && (
        <div
          role="alert"
          className="mt-3 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default LoginForm;
