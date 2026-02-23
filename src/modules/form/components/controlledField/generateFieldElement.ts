import { FieldTypeEnum } from './common/enum/FieldType';
import { FormFieldConfigType } from './common/enum/FormFieldConfigType';
import { DecimalFieldConfig } from './numberField/fieldConfig/DecimalFieldConfig';
import { IntegerFieldConfig } from './numberField/fieldConfig/IntegerFieldConfig';
import { TextFieldConfig } from './textfield/TextFieldConfig';

export const generateFieldElement = (
  type: FieldTypeEnum
): FormFieldConfigType | null => {
  let newField = null;
  switch (type) {
    case FieldTypeEnum.InputTypeText:
      newField = TextFieldConfig();
      break;
    case FieldTypeEnum.InputTypeInteger:
      newField = IntegerFieldConfig();
      break;
    case FieldTypeEnum.InputTypeDecimal:
      newField = DecimalFieldConfig();
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
    case FieldTypeEnum.InputTypeInteger:
      newField = IntegerFieldConfig(field);
      break;
    case FieldTypeEnum.InputTypeDecimal:
      newField = DecimalFieldConfig(field);
      break;
    default:
      break;
  }
  return newField;
};
