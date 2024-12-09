import useDesigner from '@/hooks/useDesigner';
import { Active, Over, useDndMonitor } from '@dnd-kit/core';
import { FieldTypeEnum } from '../controlledField/enum/FieldType';
import { generateFieldElement } from '../controlledField/generateFieldElement';

const useDragAndDropManager = () => {
  const { elements, addElements, updatePosition } = useDesigner();

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      /**
       * active: Element that we are dragging
       * over: Element that we are dragging over
       */
      if (!active || !over) {
        return;
      }

      const isDraggingDesignerBtnElement =
        active.data?.current?.isDesignerBtnElement;
      if (isDraggingDesignerBtnElement) {
        console.log('isDraggingDesignerBtnElement');

        handleAddNewElement(active, over);
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      if (isDraggingDesignerElement) {
        handleEditPositionElement(active, over);
      }
    },
  });

  const handleAddNewElement = (active: Active, over: Over) => {
    const type = active.data?.current?.type as FieldTypeEnum;
    const newElement = generateFieldElement(type);
    if (!newElement) {
      return;
    }
    //First scenario drop a sidebar item the designer Area
    const isDroppingOverDesignerArea = over.data?.current?.isDesignerDropArea;
    if (isDroppingOverDesignerArea) {
      console.log('isDroppingOverDesignerArea');
      addElements(elements.length, newElement);
    }

    //Second scenario drop a sidebar item to the designer Area over a element
    const isDroppingOverDesignerElement =
      over.data?.current?.isTopHalfDesignerElement ||
      over.data?.current?.isBottomHalfDesignerElement;

    if (isDroppingOverDesignerElement) {
      const overElementIndex = elements.findIndex(
        (element) => element.id === over.data?.current?.elementId
      );
      if (overElementIndex === -1) {
        throw new Error('Element not found');
      }
      if (over.data?.current?.isTopHalfDesignerElement) {
        console.log('isDroppingOverDesignerElement TopHalf');
        addElements(overElementIndex, newElement);
      }
      if (over.data?.current?.isBottomHalfDesignerElement) {
        console.log('isDroppingOverDesignerElement BottomHalf');
        addElements(overElementIndex + 1, newElement);
      }
    }
  };

  const handleEditPositionElement = (active: Active, over: Over) => {
    const isDroppingOverDesignerElement =
      over.data?.current?.isTopHalfDesignerElement ||
      over.data?.current?.isBottomHalfDesignerElement;

    if (isDroppingOverDesignerElement) {
      const activeId = active.data?.current?.elementId;
      const overId = over.data?.current?.elementId;
      updatePosition(
        activeId,
        overId,
        over.data?.current?.isTopHalfDesignerElement
      );
    }
  };

  return {};
};

export default useDragAndDropManager;
