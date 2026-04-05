import { v4 as uuidv4 } from 'uuid';
import { Rows3 } from 'lucide-react';
import { FieldTypeEnum } from '../common/enum/FieldType';
import { FormFieldConfigType } from '../common/enum/FormFieldConfigType';
import CollectionFieldComponent from './CollectionFieldComponent';
import CollectionFieldControlled from './controlled/CollectionFieldControlled';
import CollectionFieldEditableAttributesForm from './form/CollectionFieldEditableAttributesForm';
import CollectionFieldRulesForm from './form/CollectionFieldRulesForm';

const collectionRender = {
  Component: CollectionFieldComponent,
  Controlled: CollectionFieldControlled,
  EditablePropsForm: CollectionFieldEditableAttributesForm,
  RulesForm: CollectionFieldRulesForm,
};

export const CollectionFieldConfig = (
  field?: FormFieldConfigType | null | undefined
): FormFieldConfigType => {
  if (field) {
    return {
      ...field,
      render: collectionRender,
    } as FormFieldConfigType;
  }

  const id = uuidv4();

  return {
    id,
    icon: Rows3,
    label: 'Collection Field',
    type: FieldTypeEnum.Collection,
    properties: {
      name: `collection-field-${id}`,
      label: 'Collection',
      helperText: 'Use this field to add multiple items.',
      informationText: 'Each row is created from a modal subform.',
      addButtonLabel: 'Add item',
      emptyStateText: 'No items added yet.',
      itemFields: [],
    },
    rules: {
      required: undefined,
      minItems: undefined,
      maxItems: undefined,
    },
    render: collectionRender,
  };
};
