import { FieldTypeEnum } from './enum/FieldType';
import { FormFieldConfigType } from './enum/FormFieldConfigType';
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
