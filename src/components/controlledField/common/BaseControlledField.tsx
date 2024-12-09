'use client';
import {
  Control,
  Controller,
  FieldError,
  FieldPathValue,
  FieldValues,
  Noop,
  Path,
  RefCallBack,
  RegisterOptions,
  UseFormWatch,
} from 'react-hook-form';
import useDependedField from './useDependedField';

export type DependentField<T extends FieldValues> =
  | Path<T>
  | { field: Path<T>; value: FieldPathValue<T, Path<T>> };

type BaseControlledFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  watch: UseFormWatch<T>;
  dependentFields?: DependentField<T>[];
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  disabled?: boolean;
  render: (props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (...event: any[]) => void;
    onBlur: Noop;
    value: FieldPathValue<T, Path<T>>;
    disabled?: boolean;
    name: string;
    ref: RefCallBack;
    error: FieldError | undefined;
    invalid: boolean;
    // valueToSet?: any;
  }) => React.ReactElement;
};

const BaseControlledField = <T extends FieldValues>({
  name,
  control,
  watch,
  dependentFields,
  defaultValue,
  rules,
  disabled,
  // valueToSet,
  render,
}: BaseControlledFieldProps<T>) => {
  const { allFieldsHaveValues } = useDependedField<T>({
    name,
    control,
    watch,
    dependentFields,
  });

  if (!allFieldsHaveValues) {
    return null;
  }

  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      control={control}
      disabled={disabled}
      render={({
        field: { value, onChange, onBlur, name, ref },
        fieldState: { error, invalid },
      }) => {
        // useEffect(() => {
        //   if (valueToSet) {
        //     onChange(valueToSet);
        //   }
        // }, [valueToSet]);
        return render({
          value,
          onChange,
          onBlur,
          name,
          ref,
          error: error,
          disabled: disabled,
          invalid: invalid,
        });
      }}
    />
  );
};

export default BaseControlledField;
