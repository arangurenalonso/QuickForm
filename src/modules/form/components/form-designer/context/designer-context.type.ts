import { FormType } from '@/modules/form/types/form.types';
import { FormFieldConfigType } from '../../controlledField/common/enum/FormFieldConfigType';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from '@/common/components/dynamic-table/dynamic-table.types';

export type SelectedFieldType = {
  sectionId: string;
  fieldId: string;
} | null;

export type SectionType = {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldConfigType[];
};

export type FormTemplateType = {
  sections: SectionType[];
  form: FormType;
};
export type SubmissionType = {
  columns: DynamicTableColumnType[];
  rows: DynamicTableRowType[];
};
