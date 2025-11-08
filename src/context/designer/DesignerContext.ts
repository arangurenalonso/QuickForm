import { UpdatedTypeEnum } from '@/modules/formbuilder/components/controlledField/enum/FieldType';
import { FormFieldConfigType } from '@/modules/formbuilder/components/controlledField/enum/FormFieldConfigType';
import { createContext } from 'react';

type DesignerContextType = {
  elements: FormFieldConfigType[];
  selectedElement: FormFieldConfigType | null;
  addElements: (index: number, element: FormFieldConfigType) => void;
  removeElement: (id: string) => void;
  handleSelectedElement: (element: FormFieldConfigType | null) => void;
  updatedElement: (element: FormFieldConfigType, type: UpdatedTypeEnum) => void;
  // setElements: Dispatch<SetStateAction<FormFieldConfigType[]>>;
  updatePosition: (
    draggedElementId: string,
    overElementId: string,
    isAbove: boolean
  ) => void;
};
export const DesignerContext = createContext<DesignerContextType | null>(null);
