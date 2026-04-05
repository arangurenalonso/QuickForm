import { createContext } from 'react';
import { SectionType, SelectedFieldType } from './designer-context.type';
import { FormFieldConfigType } from '../../controlledField/common/enum/FormFieldConfigType';

type DesignerContextType = {
  // Sections Management
  sections: SectionType[];
  activeSectionId: string;
  setActiveSection: (sectionId: string) => void;
  addSection: (title?: string) => void;
  removeSection: (sectionId: string) => void;
  updateSectionMeta: (
    sectionId: string,
    payload: { title?: string; description?: string }
  ) => void;

  // Fields Management
  selectedField: SelectedFieldType;
  handleSelectedField: (payload: SelectedFieldType) => void;
  addElement: (
    sectionId: string,
    index: number,
    element: FormFieldConfigType
  ) => void;
  removeField: (sectionId: string, fieldId: string) => void;
  updateField: (updatedField: FormFieldConfigType) => void;
  reorderFieldInSection: (
    sectionId: string,
    activeFieldId: string,
    overFieldId: string
  ) => void;
  setFormStructure: (sections: SectionType[]) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);
