import { FieldTypeEnum } from './common/enum/FieldType';
import { FormFieldConfigType } from './common/enum/FormFieldConfigType';
import { DecimalFieldConfig } from './numberField/fieldConfig/DecimalFieldConfig';
import { IntegerFieldConfig } from './numberField/fieldConfig/IntegerFieldConfig';
import { TextFieldConfig } from './textfield/TextFieldConfig';

type FormElementsType = {
  [key in FieldTypeEnum]: FormFieldConfigType;
};

export const FormElements: FormElementsType = {
  [FieldTypeEnum.InputTypeText]: TextFieldConfig(),
  [FieldTypeEnum.InputTypeDecimal]: DecimalFieldConfig(),
  [FieldTypeEnum.InputTypeInteger]: IntegerFieldConfig(),
};
