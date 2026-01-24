import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useMemo, useState } from 'react';
import SidebarBtnDragOverlay from './component/sidebar/SidebarBtnDragOverlay';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { FieldTypeEnum } from './component/controlledField/enum/FieldType';
import { FormElements } from './component/controlledField/FormElements';

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { sections, activeSectionId } = useDesigner();

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeSectionId),
    [sections, activeSectionId]
  );

  useDndMonitor({
    onDragStart: (event) => setDraggedItem(event.active),
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;

  // 1) Overlay para botones del sidebar
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;
  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as FieldTypeEnum;
    const formElement = FormElements[type];

    node = (
      <SidebarBtnDragOverlay
        icon={formElement.icon}
        type={formElement.type}
        label={formElement.label}
      />
    );
  }

  // 2) Overlay para fields dentro del designer
  const isDesignerField = draggedItem?.data?.current?.isDesignerField;
  if (isDesignerField) {
    const fieldId = String(draggedItem.id);

    // primero intenta en sección activa
    let field = activeSection?.fields.find((f) => f.id === fieldId);

    // fallback: buscar en todas las secciones
    if (!field) {
      for (const s of sections) {
        const found = s.fields.find((f) => f.id === fieldId);
        if (found) {
          field = found;
          break;
        }
      }
    }

    if (!field) {
      node = <div>Field not found</div>;
    } else {
      const { properties, render } = field;
      const { Component } = render;
      node = (
        <div className="bg-accent border rounded-md w-full p-2 opacity-60 pointer-events-none">
          <Component {...properties} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
