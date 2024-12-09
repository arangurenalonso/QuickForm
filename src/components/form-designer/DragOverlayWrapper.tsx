import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { FormElements } from '../controlledField/FormElements';
import SidebarBtnDragOverlay from './sidebar/SidebarBtnDragOverlay';
import { FieldTypeEnum } from '../controlledField/enum/FieldType';
import useDesigner from '@/hooks/useDesigner';

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();
  useDndMonitor({
    onDragStart: (event) => {
      console.log('event', event);
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
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
  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements.find((element) => element.id === elementId);
    if (!element) {
      node = <div>Element not found</div>;
    } else {
      const { properties, render } = element;
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
