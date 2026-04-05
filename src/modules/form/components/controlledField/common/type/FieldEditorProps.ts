import { FormFieldConfigType } from '../enum/FormFieldConfigType';

export type FieldEditorProps = {
  formFieldConfig: FormFieldConfigType;
  canEdit: boolean;
  onChange: (updatedField: FormFieldConfigType) => void;
};
