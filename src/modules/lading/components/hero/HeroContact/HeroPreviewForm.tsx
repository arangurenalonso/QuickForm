'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/common/libs/ui/button';
import { Input } from '@/common/libs/ui/input';
import * as yup from 'yup';

type HeroPreviewFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
};

const schema: yup.ObjectSchema<HeroPreviewFormValues> = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required.')
    .min(2, 'Name must be at least 2 characters long.'),
  email: yup
    .string()
    .trim()
    .required('Email is required.')
    .email('Enter a valid email address.'),
  phoneNumber: yup
    .string()
    .required('Phone number is required.')
    .test(
      'valid-phone-length',
      'Phone number must contain between 7 and 15 digits.',
      (value) => {
        if (!value) return false;
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length >= 7 && digitsOnly.length <= 15;
      }
    ),
});

const HeroPreviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HeroPreviewFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: HeroPreviewFormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-foreground/80"
          >
            Full name
          </label>
          <Input
            id="name"
            placeholder="Enter your full name"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground/80"
          >
            Work email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-foreground/80"
          >
            Phone number
          </label>
          <Input
            id="phoneNumber"
            type="tel"
            inputMode="tel"
            placeholder="Enter your phone number"
            {...register('phoneNumber')}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-destructive">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full rounded-xl"
        disabled={isSubmitting}
      >
        Continue
      </Button>
    </form>
  );
};

export default HeroPreviewForm;
