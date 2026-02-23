import NumberFieldComponent from '../NumberFieldComponent';
import { v4 as uuidv4 } from 'uuid';
import { TbDecimal } from 'react-icons/tb';
import { FieldTypeEnum } from '../../common/enum/FieldType';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';
import DecimalFieldEditableAttributesForm from '../form/decimal/DecimalFieldEditableAttributesForm';
import DecimalFieldRulesForm from '../form/decimal/DecimalFieldRulesForm';
import IntegerFieldControlled from '../controlled/IntegerFieldControlled';
import DecimalFieldControlled from '../controlled/NumberFieldControlled';

export const DecimalFieldConfig = (
  field?: FormFieldConfigType | null | undefined
): FormFieldConfigType => {
  if (field) {
    return {
      ...field,
      render: {
        Component: NumberFieldComponent,
        Controlled: IntegerFieldControlled,
        EditablePropsForm: DecimalFieldEditableAttributesForm,
        RulesForm: DecimalFieldRulesForm,
      },
    } as FormFieldConfigType;
  }
  const id = uuidv4();
  return {
    id: `${id}`,
    icon: TbDecimal,
    label: 'Decimal Field',
    type: FieldTypeEnum.InputTypeDecimal,
    properties: {
      name: `decimal-field-${id}`,
      label: 'Default Decimal Label',
      helperText: 'Default Decimal helperText',
      placeholder: 'Default Decimal Placeholder',
      informationText: 'Default Decimal information text',
      icon: undefined,
      prefix: '',
      suffix: '',
      decimalScale: 2,
      allowNegative: true,
    },
    rules: {
      required: undefined,
      max: undefined,
      min: undefined,
    },
    render: {
      Component: NumberFieldComponent,
      Controlled: DecimalFieldControlled,
      EditablePropsForm: DecimalFieldEditableAttributesForm,
      RulesForm: DecimalFieldRulesForm,
    },
  };
};
