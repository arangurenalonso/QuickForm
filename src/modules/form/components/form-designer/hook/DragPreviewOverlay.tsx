'use client';

import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useMemo, useState } from 'react';
import useDesigner from '@/modules/form/hooks/useDesigner';
import { FieldTypeEnum } from '../../controlledField/common/enum/FieldType';
import { FormElements } from '../../controlledField/FormElements';
import SidebarBtnDragOverlay from './SidebarBtnDragOverlay';

const DragPreviewOverlay = () => {
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

  if (!draggedItem) {
    return <DragOverlay />;
  }

  let node = <div>No drag overlay</div>;

  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;
  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as FieldTypeEnum;
    const formElement = FormElements[type];

    node = (
      <SidebarBtnDragOverlay
        icon={formElement.icon}
        label={formElement.label}
      />
    );
  }

  const isDesignerField = draggedItem?.data?.current?.isDesignerField;
  if (isDesignerField) {
    const fieldId = String(draggedItem.id);

    let field = activeSection?.fields.find((f) => f.id === fieldId);

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
        <div className="w-[min(920px,calc(100vw-4rem))] rounded-xl border bg-background px-4 py-2 shadow-2xl opacity-95 pointer-events-none">
          <Component {...properties} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragPreviewOverlay;
