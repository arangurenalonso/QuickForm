'use client';
import {
  Control,
  FieldPathValue,
  FieldValues,
  Path,
  RegisterOptions,
  //   UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import BaseControlledField, {
  DependentField,
} from '../common/BaseControlledField';
import NumberFieldComponent from './NumberFieldComponent';
import NumberFieldEditableProps from './type/NumberFieldEditableProps';
// import { v4 as uuidv4 } from 'uuid';

type NumberFieldControlledProps<T extends FieldValues> = {
  name: Path<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control?: Control<T>;
  disabled?: boolean;
  //   setValue: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
  dependentFields?: DependentField<T>[];
  //   valueToSet?: FieldPathValue<T, Path<T>> | string | undefined | null;
};
const NumberFieldControlled = <T extends FieldValues>({
  watch,
  // setValue,
  control,
  dependentFields,
  name,
  disabled,
  defaultValue,
  rules,
  //   valueToSet,

  label,
  helperText = ' ',
  informationText,
  //   isFromArrayForm,

  icon,
  placeholder,
  prefix,
  suffix,
  decimalScale = 2,
  allowNegative = true,
}: NumberFieldControlledProps<T> & NumberFieldEditableProps) => {
  if (!watch || !control) {
    return null;
  }

  return (
    <BaseControlledField
      watch={watch}
      dependentFields={dependentFields}
      name={name}
      //   valueToSet={valueToSet}
      control={control}
      disabled={disabled}
      defaultValue={defaultValue}
      rules={rules}
      render={({ value, onChange, onBlur, name, ref, error, disabled }) => {
        return (
          <NumberFieldComponent
            inputRef={ref}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            helperText={helperText}
            informationText={informationText}
            placeholder={placeholder || ''}
            error={!!error}
            errorMessage={error?.message}
            disabled={disabled}
            icon={icon}
            prefix={prefix}
            suffix={suffix}
            decimalScale={decimalScale}
            allowNegative={allowNegative}
          />
        );
      }}
    />
  );
};

export default NumberFieldControlled;
