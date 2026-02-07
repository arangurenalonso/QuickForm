'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/common/libs/utils';
import { SidebarBtnBase, type SidebarBtnBaseProps } from './SidebarBtnBase';

export type SidebarBtnElementProps = SidebarBtnBaseProps & { type: string };

const SidebarBtnElement = ({ type, ...rest }: SidebarBtnElementProps) => {
  const draggable = useDraggable({
    id: `designer-btn-${type}`,
    data: { type, isDesignerBtnElement: true },
  });

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="w-fit"
    >
      <SidebarBtnBase
        {...rest}
        className={cn(
          'cursor-grab select-none',
          draggable.isDragging && 'ring-2 ring-primary'
        )}
      />
    </div>
  );
};

export default SidebarBtnElement;
