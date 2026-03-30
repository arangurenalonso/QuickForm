'use client';

import {
  Control,
  FieldPathValue,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormWatch,
} from 'react-hook-form';

import BaseControlledField, {
  DependentField,
} from '../common/BaseControlledField';
import PhoneFieldComponent from './PhoneFieldComponent';
import PhoneFieldEditableProps from './PhoneFieldEditableProps';
import { PhoneFieldValue } from './PhoneFieldValue';

type PhoneFieldControlledProps<T extends FieldValues> = {
  name: Path<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  disabled?: boolean;
  watch?: UseFormWatch<T>;
  control?: Control<T>;
  dependentFields?: DependentField<T>[];
};

const PhoneFieldControlled = <T extends FieldValues>({
  watch,
  control,
  dependentFields,
  name,
  disabled,
  defaultValue,
  rules,
  label,
  helperText = ' ',
  informationText,
  placeholder,
  required,
  locale = 'en',
  defaultCountryIso2 = 'PE',
}: PhoneFieldControlledProps<T> & PhoneFieldEditableProps) => {
  if (!watch || !control) {
    return null;
  }

  const safeDefaultValue =
    defaultValue ??
    ({
      countryIso2: defaultCountryIso2,
      phoneNumber: '',
    } as FieldPathValue<T, Path<T>>);

  return (
    <BaseControlledField
      watch={watch}
      dependentFields={dependentFields}
      name={name}
      control={control}
      disabled={disabled}
      defaultValue={safeDefaultValue}
      rules={rules}
      render={({ value, onChange, onBlur, name, ref, error, disabled }) => {
        const safeValue = (value as PhoneFieldValue | undefined) ?? {
          countryIso2: defaultCountryIso2,
          phoneNumber: '',
        };

        return (
          <PhoneFieldComponent
            inputRef={ref}
            label={label}
            value={safeValue}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            helperText={helperText}
            informationText={informationText}
            placeholder={placeholder}
            error={!!error}
            errorMessage={error?.message}
            disabled={disabled}
            required={required}
            locale={locale}
            defaultCountryIso2={defaultCountryIso2}
          />
        );
      }}
    />
  );
};

export default PhoneFieldControlled;
