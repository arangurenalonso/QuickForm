import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';
import { Active, Over, useDndMonitor } from '@dnd-kit/core';
import { generateFieldElement } from '../../controlledField/generateFieldElement';
import { FieldTypeEnum } from '../../controlledField/common/enum/FieldType';

const useDragAndDropManager = () => {
  const { sections, activeSectionId, addElement, reorderFieldInSection } =
    useDesigner();

  const activeSection = sections.find((s) => s.id === activeSectionId);

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (!active || !over) return;

      // 1) Sidebar -> agregar field a sección activa
      const isDraggingDesignerBtnElement =
        active.data?.current?.isDesignerBtnElement;

      if (isDraggingDesignerBtnElement) {
        handleAddNewElement(active, over);
        return;
      }

      // 2) Reorder field dentro de la sección activa
      const isDraggingDesignerField = active.data?.current?.isDesignerField;

      if (isDraggingDesignerField) {
        const activeFieldId = String(active.id);
        const overId = String(over.id);

        if (!activeFieldId || !overId) return;
        if (activeFieldId === overId) return;

        // Si suelta en el área vacía, no reordenamos
        if (overId === 'designer-drop-area') return;

        // Solo reorder si el over es otro field
        reorderFieldInSection(activeSectionId, activeFieldId, overId);
      }
    },
  });

  const handleAddNewElement = (active: Active, over: Over) => {
    if (!activeSection) return;

    const type = active.data?.current?.type as FieldTypeEnum;

    const newField = generateFieldElement(type);
    if (!newField) return;

    // Drop en el área => append
    if (String(over.id) === 'designer-drop-area') {
      addElement(activeSectionId, activeSection.fields.length, newField);
      return;
    }

    // Drop sobre un field => insert arriba/abajo
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

  return {};
};

export default useDragAndDropManager;
