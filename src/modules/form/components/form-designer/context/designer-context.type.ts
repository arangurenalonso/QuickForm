import { FormFieldConfigType } from '../../controlledField/common/enum/FormFieldConfigType';

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
