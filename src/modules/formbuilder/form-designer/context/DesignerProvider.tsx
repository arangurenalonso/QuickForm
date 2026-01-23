'use client';

import { useState } from 'react';
import { DesignerContext } from './DesignerContext';
import { UpdatedTypeEnum } from '@/modules/formbuilder/form-designer/component/controlledField/enum/FieldType';
import { FormFieldConfigType } from '@/modules/formbuilder/form-designer/component/controlledField/enum/FormFieldConfigType';
import { arrayMove } from '@dnd-kit/sortable';

export default function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<FormFieldConfigType[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormFieldConfigType | null>(null);

  const addElements = (index: number, element: FormFieldConfigType) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updatedElement = (
    updatedElement: FormFieldConfigType,
    type: UpdatedTypeEnum
  ) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex(
        (element) => element.id === updatedElement.id
      );

      // ✅ guard
      if (index === -1) return prev;

      if (type === UpdatedTypeEnum.EditableForm) {
        newElements[index] = {
          ...newElements[index],
          properties: updatedElement.properties,
        };
      }

      if (type === UpdatedTypeEnum.RuleForm) {
        newElements[index] = {
          ...newElements[index],
          rules: updatedElement.rules,
        };
      }

      return newElements;
    });

    setSelectedElement((prev) => {
      if (!prev) return null;

      if (prev.id !== updatedElement.id) {
        // ✅ si estás editando otro elemento, no lo mates
        return prev;
      }

      if (type === UpdatedTypeEnum.EditableForm) {
        return { ...prev, properties: updatedElement.properties };
      }

      if (type === UpdatedTypeEnum.RuleForm) {
        return { ...prev, rules: updatedElement.rules };
      }

      return prev;
    });
  };

  const handleSelectedElement = (element: FormFieldConfigType | null) => {
    setSelectedElement(element);
  };

  // ✅ Reorden robusto (sin bug de índices)
  const updatePosition = (draggedElementId: string, overElementId: string) => {
    setElements((prevElements) => {
      const oldIndex = prevElements.findIndex((e) => e.id === draggedElementId);
      const newIndex = prevElements.findIndex((e) => e.id === overElementId);

      if (oldIndex === -1 || newIndex === -1) return prevElements;
      if (oldIndex === newIndex) return prevElements;

      return arrayMove(prevElements, oldIndex, newIndex);
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        selectedElement,
        addElements,
        removeElement,
        updatedElement,
        handleSelectedElement,
        updatePosition,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
