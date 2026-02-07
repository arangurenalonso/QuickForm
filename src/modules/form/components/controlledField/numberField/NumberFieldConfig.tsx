import NumberFieldEditableAttributesForm from './form/NumberFieldEditableAttributesForm';
import NumberFieldRulesForm from './form/NumberFieldRulesForm';
import NumberFieldComponent from './NumberFieldComponent';
import NumberFieldControlled from './NumberFieldControlled';
import { v4 as uuidv4 } from 'uuid';
import { MdNumbers } from 'react-icons/md';
import { FieldTypeEnum } from '../common/enum/FieldType';
import { FormFieldConfigType } from '../common/enum/FormFieldConfigType';

export const NumberFieldConfig = (
  field?: FormFieldConfigType | null | undefined
): FormFieldConfigType => {
  if (field) {
    return {
      ...field,
      render: {
        Component: NumberFieldComponent,
        Controlled: NumberFieldControlled,
        EditablePropsForm: NumberFieldEditableAttributesForm,
        RulesForm: NumberFieldRulesForm,
      },
    } as FormFieldConfigType;
  }
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
      required: undefined,
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
