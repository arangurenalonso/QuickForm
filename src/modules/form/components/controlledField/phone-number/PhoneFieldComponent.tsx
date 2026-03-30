'use client';

import React, { useMemo } from 'react';
import { AlertCircle, Info } from 'lucide-react';

import { Input } from '@/common/libs/ui/input';
import { cn } from '@/common/libs/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/common/libs/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/common/libs/ui/select';
import { getPhoneCountryOptions } from './phone-country.util';
import PhoneFieldEditableProps from './PhoneFieldEditableProps';
import { PhoneFieldValue } from './PhoneFieldValue';

interface PhoneFieldComponentProps {
  inputRef?: React.Ref<HTMLInputElement>;
  value?: PhoneFieldValue;
  onChange?: (value?: PhoneFieldValue) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: boolean;
  errorMessage?: React.ReactNode;
  disabled?: boolean;
  name?: string;
}

const PhoneFieldComponent: React.FC<
  PhoneFieldComponentProps & PhoneFieldEditableProps
> = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  placeholder,
  error = false,
  errorMessage,
  disabled = false,
  inputRef,
  helperText,
  informationText,
  required = false,
  locale = 'en',
  defaultCountryIso2 = 'PE',
}) => {
  const countries = useMemo(() => getPhoneCountryOptions(locale), [locale]);

  const safeValue: PhoneFieldValue = value ?? {
    countryIso2: defaultCountryIso2,
    phoneNumber: '',
  };

  const selectedCountry =
    countries.find((country) => country.iso2 === safeValue.countryIso2) ??
    countries.find((country) => country.iso2 === defaultCountryIso2) ??
    countries[0];

  const handleCountryChange = (countryIso2: string) => {
    onChange?.({
      countryIso2,
      phoneNumber: safeValue.phoneNumber ?? '',
    });
  };

  const handlePhoneChange = (rawValue: string) => {
    const sanitizedValue = rawValue.replace(/[^\d]/g, '');

    onChange?.({
      countryIso2: selectedCountry?.iso2 ?? defaultCountryIso2,
      phoneNumber: sanitizedValue,
    });
  };

  return (
    <div className="space-y-2">
      {(label || informationText) && (
        <div className="flex items-center gap-2">
          {label && (
            <label
              htmlFor={name}
              className={cn(
                'text-sm font-medium leading-none',
                error ? 'text-destructive' : 'text-foreground'
              )}
            >
              {label}
              {required && (
                <span
                  className={cn(
                    'ml-1',
                    error ? 'text-destructive' : 'text-muted-foreground'
                  )}
                  aria-hidden="true"
                >
                  *
                </span>
              )}
            </label>
          )}
          {informationText && (
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      'text-muted-foreground hover:text-foreground',
                      error && 'text-destructive hover:text-destructive'
                    )}
                    onClick={(e) => e.preventDefault()}
                    aria-label="Information"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[280px] text-sm">
                  {informationText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}

      <div
        className={cn(
          'flex min-h-11 items-stretch overflow-hidden rounded-md border bg-background',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          error
            ? 'border-destructive focus-within:ring-destructive'
            : 'border-input',
          disabled && 'cursor-not-allowed opacity-60'
        )}
      >
        <div className="flex items-center border-r border-border px-3 text-sm font-medium text-muted-foreground">
          <span>+{selectedCountry?.dialCode}</span>
        </div>

        <Input
          id={name}
          name={name}
          type="tel"
          inputMode="numeric"
          value={safeValue.phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder ?? 'Phone number'}
          disabled={disabled}
          ref={inputRef}
          className={cn(
            'h-auto border-0 rounded-none p-3 shadow-none focus-visible:ring-0',
            'flex-1 bg-transparent placeholder:text-muted-foreground',
            disabled && 'pointer-events-none'
          )}
        />
        <div className=" border-l border-border">
          <Select
            value={selectedCountry.iso2}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger className="w-[60px] border-0 shadow-none focus:ring-0">
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">
                  {selectedCountry.flag}
                </span>
              </div>
            </SelectTrigger>

            <SelectContent className="max-h-80">
              {countries.map((country) => (
                <SelectItem key={country.iso2} value={country.iso2}>
                  <div className="flex w-full items-center gap-2">
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="text-muted-foreground">
                      +{country.dialCode}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p
        className={cn(
          'min-h-[1rem] text-xs',
          error
            ? 'flex items-center gap-2 text-destructive'
            : 'text-muted-foreground'
        )}
      >
        {error ? (
          <>
            <AlertCircle className="h-4 w-4" />
            {errorMessage}
          </>
        ) : (
          helperText || '\u00A0'
        )}
      </p>
    </div>
  );
};

export default PhoneFieldComponent;
