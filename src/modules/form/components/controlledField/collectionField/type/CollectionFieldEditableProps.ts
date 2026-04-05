import type { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';

export default interface CollectionFieldEditableProps {
  name: string;
  label?: string;
  helperText?: string;
  informationText?: string;
  addButtonLabel?: string;
  emptyStateText?: string;
  itemFields: FormFieldConfigType[];
}
