import { createContext } from 'react';
import { UpdatedTypeEnum } from '../component/controlledField/enum/FieldType';
import { FormFieldConfigType } from '../component/controlledField/enum/FormFieldConfigType';
import { SectionType, SelectedFieldType } from './designer-context.type';

type DesignerContextType = {
  // Sections Management
  sections: SectionType[];
  activeSectionId: string;
  setActiveSection: (sectionId: string) => void;
  addSection: (title?: string) => void;
  removeSection: (sectionId: string) => void;
  renameSection: (sectionId: string, title: string) => void;
  // Fields Management
  selectedField: SelectedFieldType;
  //   handleSelectedElement: (element: FormFieldConfigType | null) => void;
  handleSelectedField: (payload: SelectedFieldType) => void;
  //   addElements: (index: number, element: FormFieldConfigType) => void;
  addElement: (
    sectionId: string,
    index: number,
    element: FormFieldConfigType
  ) => void;
  //   removeElement: (id: string) => void;
  removeField: (sectionId: string, fieldId: string) => void;
  //   updatedElement: (element: FormFieldConfigType, type: UpdatedTypeEnum) => void;
  updateField: (
    updatedField: FormFieldConfigType,
    type: UpdatedTypeEnum
  ) => void;
  //   updatePosition: (draggedElementId: string, overElementId: string) => void;
  reorderFieldInSection: (
    sectionId: string,
    activeFieldId: string,
    overFieldId: string
  ) => void;
};

// type DesignerContextType = {
//   elements: FormFieldConfigType[];
//   selectedElement: FormFieldConfigType | null;
// };
export const DesignerContext = createContext<DesignerContextType | null>(null);
