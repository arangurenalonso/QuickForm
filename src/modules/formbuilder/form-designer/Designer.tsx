import React, { useMemo } from 'react';
import { cn } from '@/common/libs/utils';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { useDroppable } from '@dnd-kit/core';
import useDragAndDropManager from './hook/useDragAndDropManager';
import DesignerElementWrapper from './designer-element/DesignerElementWrapper';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const Designer = () => {
  const { sections, activeSectionId, handleSelectedField } = useDesigner();
  useDragAndDropManager();

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeSectionId),
    [sections, activeSectionId]
  );

  const fields = activeSection?.fields ?? [];

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: { isDesignerDropArea: true, sectionId: activeSectionId },
  });

  if (!activeSection) {
    return (
      <div className="p-4 w-full h-full flex items-center justify-center">
        <p className="text-2xl text-muted-foreground font-bold">
          No active section selected.
        </p>
      </div>
    );
  }
  return (
    <div
      className="p-4 w-full h-full"
      onClick={() => handleSelectedField(null)}
    >
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
          droppable.isOver && 'ring-2 ring-primary ring-inset'
        )}
      >
        {!droppable.isOver && fields.length === 0 && (
          <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
            Drop here
          </p>
        )}

        {droppable.isOver && fields.length === 0 && (
          <div className="p-4 w-full">
            <div className="h-[120px] rounded-md bg-primary/20"></div>
          </div>
        )}

        {fields.length > 0 && (
          <div className="flex flex-col w-full gap-2 p-4">
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field) => (
                <DesignerElementWrapper
                  key={field.id}
                  sectionId={activeSectionId}
                  element={field}
                />
              ))}
            </SortableContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default Designer;
