'use client';

import { FormFieldConfigType } from '@/components/controlledField/enum/FormFieldConfigType';
import { useState } from 'react';
import { DesignerContext } from './DesignerContext';
import { UpdatedTypeEnum } from '@/components/controlledField/enum/FieldType';

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
    setElements((prev) => {
      return prev.filter((element) => element.id !== id);
    });
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
      if (prev) {
        if (type === UpdatedTypeEnum.EditableForm) {
          return {
            ...prev,
            properties: updatedElement.properties,
          };
        }
        if (type === UpdatedTypeEnum.RuleForm) {
          return {
            ...prev,
            rules: updatedElement.rules,
          };
        }
      }
      return null;
    });
  };
  const handleSelectedElement = (element: FormFieldConfigType | null) => {
    setSelectedElement(element);
  };
  const updatePosition = (
    draggedElementId: string,
    overElementId: string,
    isAbove: boolean
  ) => {
    setElements((prevElements) => {
      // Find the indices of the dragged element and the target element
      const activeElementIndex = prevElements.findIndex(
        (element) => element.id === draggedElementId
      );
      const overElementIndex = prevElements.findIndex(
        (element) => element.id === overElementId
      );

      // Validate that both elements exist
      if (activeElementIndex === -1 || overElementIndex === -1) {
        throw new Error('Element not found');
      }

      // Extract the dragged element
      const activeElement = prevElements[activeElementIndex];

      // Create a new array without the dragged element
      const newPositionElements = prevElements.filter(
        (element) => element.id !== draggedElementId
      );

      // Calculate the new position of the dragged element
      const newPosition = isAbove ? overElementIndex : overElementIndex + 1;

      // Insert the dragged element into the new position
      newPositionElements.splice(newPosition, 0, activeElement);

      return newPositionElements;
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
