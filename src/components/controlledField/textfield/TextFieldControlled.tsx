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
import TextFieldComponent from './TextFieldComponent';
import TextFieldEditableProps from './type/TextFieldEditableProps';

type TextFieldControlledProps<T extends FieldValues> = {
  name: Path<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  disabled?: boolean;
  //   setValue: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
  control?: Control<T>;
  dependentFields?: DependentField<T>[];
  //   valueToSet?: FieldPathValue<T, Path<T>> | string | undefined | null;
};

const TextFieldControlled = <T extends FieldValues>({
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
  icon,
  placeholder,
}: TextFieldControlledProps<T> & TextFieldEditableProps) => {
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
          <TextFieldComponent
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
          />
        );
      }}
    />
  );
};

export default TextFieldControlled;
