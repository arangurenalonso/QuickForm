import { FieldTypeEnum } from './common/enum/FieldType';
import { FormFieldConfigType } from './common/enum/FormFieldConfigType';
import { NumberFieldConfig } from './numberField/NumberFieldConfig';
import { TextFieldConfig } from './textfield/TextFieldConfig';

export const generateFieldElement = (
  type: FieldTypeEnum
): FormFieldConfigType | null => {
  let newField = null;
  switch (type) {
    case FieldTypeEnum.InputTypeText:
      newField = TextFieldConfig();
      break;
    case FieldTypeEnum.InputTypeNumber:
      newField = NumberFieldConfig();
      break;

    default:
      break;
  }
  return newField;
};

export const generateFieldFromExisting = (
  field: FormFieldConfigType
): FormFieldConfigType | null => {
  let newField = null;
  switch (field.type) {
    case FieldTypeEnum.InputTypeText:
      newField = TextFieldConfig(field);
      break;
    case FieldTypeEnum.InputTypeNumber:
      newField = NumberFieldConfig(field);
      break;
    default:
      break;
  }
  return newField;
};
