'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js/min';

import { Button } from '@/common/libs/ui/button';
import TextFieldControlled from '../textfield/TextFieldControlled';
import PhoneFieldControlled from './PhoneFieldControlled';

type DemoFormValues = {
  fullName: string;
  phone: {
    countryIso2: string;
    phoneNumber: string;
  };
};

const ExamplePhoneSubmitForm = () => {
  const { control, watch, handleSubmit } = useForm<DemoFormValues>({
    defaultValues: {
      fullName: '',
      phone: {
        countryIso2: 'PE',
        phoneNumber: '',
      },
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: DemoFormValues) => {
    console.log('Submitted form:', data);

    const parsedPhone = parsePhoneNumberFromString(
      data.phone.phoneNumber,
      data.phone.countryIso2 as CountryCode
    );

    console.log('Normalized E164:', parsedPhone?.number ?? 'Invalid phone');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border border-border bg-card p-6"
    >
      <TextFieldControlled<DemoFormValues>
        name="fullName"
        control={control}
        watch={watch}
        label="Full name"
        placeholder="Enter your full name"
        helperText="Write your name."
        rules={{
          required: 'Full name is required.',
          minLength: {
            value: 3,
            message: 'Full name must have at least 3 characters.',
          },
        }}
      />
      <div>
        <PhoneFieldControlled<DemoFormValues>
          name="phone"
          control={control}
          watch={watch}
          label="Phone number"
          placeholder="Enter your phone number"
          helperText="Select the country and type the local number."
          defaultCountryIso2="PE"
          informationText="We will use this phone number to contact you if necessary."
          required
          rules={{
            validate: (value) => {
              const phone = value as DemoFormValues['phone'];

              if (!phone?.countryIso2 || !phone?.phoneNumber) {
                return 'Phone number is required.';
              }

              const parsedPhone = parsePhoneNumberFromString(
                phone.phoneNumber,
                phone.countryIso2 as CountryCode
              );

              if (!parsedPhone || !parsedPhone.isValid()) {
                return 'Invalid phone number for the selected country.';
              }

              return true;
            },
          }}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Submit
      </Button>
    </form>
  );
};

export default ExamplePhoneSubmitForm;
