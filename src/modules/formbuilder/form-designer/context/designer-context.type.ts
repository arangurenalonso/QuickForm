import { FormFieldConfigType } from '../component/controlledField/enum/FormFieldConfigType';

export type SelectedFieldType = {
  sectionId: string;
  fieldId: string;
} | null;

export type SectionType = {
  id: string;
  title: string;
  fields: FormFieldConfigType[];
};
