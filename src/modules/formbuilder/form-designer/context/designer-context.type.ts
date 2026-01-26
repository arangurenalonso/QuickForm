import { FormFieldConfigType } from '../component/controlledField/common/enum/FormFieldConfigType';

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
