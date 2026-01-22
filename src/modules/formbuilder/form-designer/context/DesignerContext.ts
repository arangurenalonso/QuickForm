import { createContext } from 'react';
import { UpdatedTypeEnum } from '../component/controlledField/enum/FieldType';
import { FormFieldConfigType } from '../component/controlledField/enum/FormFieldConfigType';

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
