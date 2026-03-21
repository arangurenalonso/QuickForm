import { useState } from 'react';
import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';
import { Active, Over, useDndMonitor } from '@dnd-kit/core';
import { generateFieldElement } from '../../controlledField/generateFieldElement';
import { FieldTypeEnum } from '../../controlledField/common/enum/FieldType';

export type DropIndicatorPosition = 'top' | 'bottom';

export type DropIndicator = {
  fieldId: string;
  position: DropIndicatorPosition;
};

const useDragAndDropManager = () => {
  const { sections, activeSectionId, addElement, reorderFieldInSection } =
    useDesigner();

  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(
    null
  );

  const activeSection = sections.find((s) => s.id === activeSectionId);

  const updateDropIndicator = (active: Active | null, over: Over | null) => {
    if (!active || !over) {
      setDropIndicator(null);
      return;
    }

    const isDraggingDesignerBtnElement =
      active.data?.current?.isDesignerBtnElement;
    const isDraggingDesignerField = active.data?.current?.isDesignerField;

    if (!isDraggingDesignerBtnElement && !isDraggingDesignerField) {
      setDropIndicator(null);
      return;
    }

    const overId = String(over.id);

    // If hovering the empty container area, do not show a line over a field
    if (overId === 'designer-drop-area') {
      setDropIndicator(null);
      return;
    }

    // When dragging a field over itself, do not show a line
    if (isDraggingDesignerField && String(active.id) === overId) {
      setDropIndicator(null);
      return;
    }

    const activeRect = active.rect.current.translated;
    const overRect = over.rect;

    if (!activeRect || !overRect) {
      setDropIndicator({
        fieldId: overId,
        position: 'top',
      });
      return;
    }

    const activeCenterY = activeRect.top + activeRect.height / 2;
    const overCenterY = overRect.top + overRect.height / 2;

    setDropIndicator({
      fieldId: overId,
      position: activeCenterY < overCenterY ? 'top' : 'bottom',
    });
  };

  const handleAddNewElement = (active: Active, over: Over) => {
    if (!activeSection) return;

    const type = active.data?.current?.type as FieldTypeEnum;

    const newField = generateFieldElement(type);
    if (!newField) return;

    // Drop in empty area => append
    if (String(over.id) === 'designer-drop-area') {
      addElement(activeSectionId, activeSection.fields.length, newField);
      return;
    }

    // Drop over another field => insert above/below
    const overFieldId = String(over.id);
    const overIndex = activeSection.fields.findIndex(
      (f) => f.id === overFieldId
    );

    if (overIndex === -1) {
      addElement(activeSectionId, activeSection.fields.length, newField);
      return;
    }

    const activeRect = active.rect.current.translated;
    const overRect = over.rect;

    if (!activeRect || !overRect) {
      addElement(activeSectionId, overIndex, newField);
      return;
    }

    const activeCenterY = activeRect.top + activeRect.height / 2;
    const overCenterY = overRect.top + overRect.height / 2;

    const insertIndex = activeCenterY < overCenterY ? overIndex : overIndex + 1;
    addElement(activeSectionId, insertIndex, newField);
  };

  useDndMonitor({
    onDragMove(event) {
      updateDropIndicator(event.active, event.over);
    },
    onDragOver(event) {
      updateDropIndicator(event.active, event.over);
    },
    onDragCancel() {
      setDropIndicator(null);
    },
    onDragEnd(event) {
      const { active, over } = event;

      setDropIndicator(null);

      if (!active || !over) return;

      // 1) Sidebar -> add field to active section
      const isDraggingDesignerBtnElement =
        active.data?.current?.isDesignerBtnElement;

      if (isDraggingDesignerBtnElement) {
        handleAddNewElement(active, over);
        return;
      }

      // 2) Reorder field inside active section
      const isDraggingDesignerField = active.data?.current?.isDesignerField;

      if (isDraggingDesignerField) {
        const activeFieldId = String(active.id);
        const overId = String(over.id);

        if (!activeFieldId || !overId) return;
        if (activeFieldId === overId) return;

        // If dropped in the empty container area, do not reorder
        if (overId === 'designer-drop-area') return;

        reorderFieldInSection(activeSectionId, activeFieldId, overId);
      }
    },
  });

  return { dropIndicator };
};

export default useDragAndDropManager;
