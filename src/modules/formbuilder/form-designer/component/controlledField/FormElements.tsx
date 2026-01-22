import { FieldTypeEnum } from './enum/FieldType';
import { FormFieldConfigType } from './enum/FormFieldConfigType';
import { NumberFieldConfig } from './numberField/NumberFieldConfig';
import { TextFieldConfig } from './textfield/TextFieldConfig';

type FormElementsType = {
  [key in FieldTypeEnum]: FormFieldConfigType;
};

export const FormElements: FormElementsType = {
  [FieldTypeEnum.InputTypeText]: TextFieldConfig(),
  [FieldTypeEnum.InputTypeNumber]: NumberFieldConfig(),
};
