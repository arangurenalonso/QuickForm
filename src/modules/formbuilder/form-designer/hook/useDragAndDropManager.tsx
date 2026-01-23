import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { Active, Over, useDndMonitor } from '@dnd-kit/core';
import { FieldTypeEnum } from '../component/controlledField/enum/FieldType';
import { generateFieldElement } from '../component/controlledField/generateFieldElement';

const useDragAndDropManager = () => {
  const { elements, addElements, updatePosition } = useDesigner();

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;

      if (!active || !over) return;

      const isDraggingDesignerBtnElement =
        active.data?.current?.isDesignerBtnElement;

      if (isDraggingDesignerBtnElement) {
        handleAddNewElement(active, over);
        return;
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      if (isDraggingDesignerElement) {
        // ✅ sortable ids son element.id
        const activeId = String(active.id);
        const overId = String(over.id);

        // ✅ evita no-op / bugs
        if (!activeId || !overId || activeId === overId) return;

        // Si suelta sobre el área vacía, no hacemos nada
        if (overId === 'designer-drop-area') return;

        updatePosition(activeId, overId);
      }
    },
  });

  const handleAddNewElement = (active: Active, over: Over) => {
    const type = active.data?.current?.type as FieldTypeEnum;
    const newElement = generateFieldElement(type);
    if (!newElement) return;

    // ✅ Drop en el área: append
    const isDroppingOverDesignerArea = over.id === 'designer-drop-area';
    if (isDroppingOverDesignerArea) {
      addElements(elements.length, newElement);
      return;
    }

    // ✅ Drop sobre un elemento: insert arriba/abajo según posición del puntero
    const overId = String(over.id);
    const overElementIndex = elements.findIndex((e) => e.id === overId);
    if (overElementIndex === -1) {
      // fallback: append
      addElements(elements.length, newElement);
      return;
    }

    const activeRect = active.rect.current.translated;
    const overRect = over.rect;

    // Si no tenemos rects, insert "antes" por default
    if (!activeRect || !overRect) {
      addElements(overElementIndex, newElement);
      return;
    }

    const activeCenterY = activeRect.top + activeRect.height / 2;
    const overCenterY = overRect.top + overRect.height / 2;

    const insertIndex =
      activeCenterY < overCenterY ? overElementIndex : overElementIndex + 1;
    addElements(insertIndex, newElement);
  };

  return {};
};

export default useDragAndDropManager;
