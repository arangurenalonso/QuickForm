import IntegerFieldEditableAttributesForm from '../form/integer/IntegerFieldEditableAttributesForm';
import IntegerFieldRulesForm from '../form/integer/IntegerFieldRulesForm';
import NumberFieldComponent from '../NumberFieldComponent';
import NumberFieldControlled from '../NumberFieldControlled';
import { v4 as uuidv4 } from 'uuid';
import { MdNumbers } from 'react-icons/md';
import { FieldTypeEnum } from '../../common/enum/FieldType';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';

export const IntegerFieldConfig = (
  field?: FormFieldConfigType | null | undefined
): FormFieldConfigType => {
  if (field) {
    return {
      ...field,
      render: {
        Component: NumberFieldComponent,
        Controlled: NumberFieldControlled,
        EditablePropsForm: IntegerFieldEditableAttributesForm,
        RulesForm: IntegerFieldRulesForm,
      },
    } as FormFieldConfigType;
  }
  const id = uuidv4();
  return {
    id: `${id}`,
    icon: MdNumbers,
    label: 'Integer Field',
    type: FieldTypeEnum.InputTypeInteger,
    properties: {
      name: `integer-field-${id}`,
      label: 'Default Integer Label',
      helperText: 'Default Integer helperText',
      placeholder: 'Default Integer Placeholder',
      informationText: 'Default Integer information text',
      icon: undefined,
      prefix: '',
      suffix: '',
      allowNegative: true,
    },
    rules: {
      required: undefined,
      max: undefined,
      min: undefined,
    },
    render: {
      Component: NumberFieldComponent,
      Controlled: NumberFieldControlled,
      EditablePropsForm: IntegerFieldEditableAttributesForm,
      RulesForm: IntegerFieldRulesForm,
    },
  };
};
