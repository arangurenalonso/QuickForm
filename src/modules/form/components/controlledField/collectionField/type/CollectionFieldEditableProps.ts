import type { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';

export interface CollectionTableColumnConfig {
  fieldId: string;
  visible: boolean;
}

export default interface CollectionFieldEditableProps {
  name: string;
  label?: string;
  helperText?: string;
  informationText?: string;
  addButtonLabel?: string;
  emptyStateText?: string;
  itemFields: FormFieldConfigType[];
  tableColumns: CollectionTableColumnConfig[];
}
