import { FormFieldConfigType } from '@/modules/form/components/controlledField/common/enum/FormFieldConfigType';

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

export type DesignerState = {
  sections: SectionType[];
  activeSectionId: string;
  selectedField: SelectedFieldType;
};
