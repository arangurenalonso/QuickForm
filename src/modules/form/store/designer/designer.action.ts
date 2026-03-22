import { UpdatedTypeEnum } from '@/modules/form/components/controlledField/common/enum/FieldType';
import { FormFieldConfigType } from '@/modules/form/components/controlledField/common/enum/FormFieldConfigType';
import { SectionType, SelectedFieldType } from './designer.model';

export type DesignerAction = {
  // Sections Management
  setActiveSection: (sectionId: string) => void;
  addSection: (title?: string) => void;
  removeSection: (sectionId: string) => void;
  updateSectionMeta: (
    sectionId: string,
    payload: { title?: string; description?: string }
  ) => void;

  // Fields Management
  handleSelectedField: (payload: SelectedFieldType) => void;
  addElement: (
    sectionId: string,
    index: number,
    element: FormFieldConfigType
  ) => void;
  removeField: (sectionId: string, fieldId: string) => void;
  updateField: (
    updatedField: FormFieldConfigType,
    type: UpdatedTypeEnum
  ) => void;
  reorderFieldInSection: (
    sectionId: string,
    activeFieldId: string,
    overFieldId: string
  ) => void;
  setFormStructure: (sections: SectionType[]) => void;
  resetDesigner: () => void;
};

// type DesignerContextType = {
//   // Sections Management
//   sections: SectionType[];
//   activeSectionId: string;
//   // Fields Management
//   selectedField: SelectedFieldType;
// };
