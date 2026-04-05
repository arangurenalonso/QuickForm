import { FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';
import { FieldTypeEnum } from '../../common/enum/FieldType';

type FormFieldRules<T extends FieldValues> = Omit<
  RegisterOptions<T, Path<T>>,
  'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export const mapFieldRulesToReactHookForm = <T extends FieldValues>(
  field: FormFieldConfigType
): FormFieldRules<T> => {
  switch (field.type) {
    case FieldTypeEnum.InputTypeText:
      return {
        required: field.rules.required ? field.rules.required.message : false,
        minLength: field.rules.minLength
          ? {
              value: field.rules.minLength.value,
              message: field.rules.minLength.message,
            }
          : undefined,
        maxLength: field.rules.maxLength
          ? {
              value: field.rules.maxLength.value,
              message: field.rules.maxLength.message,
            }
          : undefined,
      };

    case FieldTypeEnum.InputTypeInteger:
    case FieldTypeEnum.InputTypeDecimal:
      return {
        required: field.rules.required ? field.rules.required.message : false,
        min: field.rules.min
          ? {
              value: field.rules.min.value,
              message: field.rules.min.message,
            }
          : undefined,
        max: field.rules.max
          ? {
              value: field.rules.max.value,
              message: field.rules.max.message,
            }
          : undefined,
      };

    default:
      return {};
  }
};
