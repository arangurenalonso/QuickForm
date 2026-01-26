import TextFieldEditableAttributesForm from './form/TextFieldEditableAttributesForm';
import TextFieldRulesForm from './form/TextFieldRulesForm';
import TextFieldComponent from './TextFieldComponent';
import TextFieldControlled from './TextFieldControlled';
import { v4 as uuidv4 } from 'uuid';
import { MdTextFields } from 'react-icons/md';
import { FieldTypeEnum } from '../common/enum/FieldType';
import { FormFieldConfigType } from '../common/enum/FormFieldConfigType';

export const TextFieldConfig = (): FormFieldConfigType => {
  const id = uuidv4();
  return {
    id: `${id}`,
    icon: MdTextFields,
    label: 'Text Field',
    type: FieldTypeEnum.InputTypeText,
    properties: {
      name: `text-field-${id}`,
      label: 'Default TextField Label',
      helperText: 'Default TextField helperText',
      placeholder: 'Default TextField Placeholder',
      informationText: 'Default TextField information text',
    },
    rules: {
      required: false,
      maxLength: undefined,
      minLength: undefined,
    },
    render: {
      Component: TextFieldComponent,
      Controlled: TextFieldControlled,
      EditablePropsForm: TextFieldEditableAttributesForm,
      RulesForm: TextFieldRulesForm,
    },
  };
};
