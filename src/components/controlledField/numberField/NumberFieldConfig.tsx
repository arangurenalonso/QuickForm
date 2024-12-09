import { FormFieldConfigType } from '../enum/FormFieldConfigType';
import { FieldTypeEnum } from '../enum/FieldType';
import NumberFieldEditableAttributesForm from '../numberField/form/NumberFieldEditableAttributesForm';
import NumberFieldRulesForm from '../numberField/form/NumberFieldRulesForm';
import NumberFieldComponent from '../numberField/NumberFieldComponent';
import NumberFieldControlled from '../numberField/NumberFieldControlled';
import { v4 as uuidv4 } from 'uuid';
import { MdNumbers } from 'react-icons/md';

export const NumberFieldConfig = (): FormFieldConfigType => {
  const id = uuidv4();
  return {
    id: `${id}`,
    icon: MdNumbers,
    label: 'Number Field',
    type: FieldTypeEnum.InputTypeNumber,
    properties: {
      name: `number-field-${id}`,
      label: 'Default Number Label',
      helperText: 'Default Number helperText',
      placeholder: 'Default Number Placeholder',
      informationText: 'Default Number information text',
      icon: undefined,
      prefix: '',
      suffix: '',
      decimalScale: 2,
      allowNegative: true,
    },
    rules: {
      required: false,
      max: undefined,
      min: undefined,
    },
    render: {
      Component: NumberFieldComponent,
      Controlled: NumberFieldControlled,
      EditablePropsForm: NumberFieldEditableAttributesForm,
      RulesForm: NumberFieldRulesForm,
    },
  };
};
