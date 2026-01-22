import React from 'react';
import { cn } from '@/common/libs/utils';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { useDroppable } from '@dnd-kit/core';
import useDragAndDropManager from './hook/useDragAndDropManager';
import DesignerElementWrapper from './designer-element/DesignerElementWrapper';

const Designer = () => {
  const { elements, handleSelectedElement } = useDesigner();
  useDragAndDropManager();
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });
  return (
    <div
      className="p-4 w-full h-full"
      onClick={() => {
        handleSelectedElement(null);
      }}
    >
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
          droppable.isOver && 'ring-2 ring-primary ring-inset'
        )}
      >
        {!droppable.isOver && elements.length === 0 && (
          <p
            className="text-3xl text-muted-foreground flex flex-grow 
           items-center font-bold"
          >
            Drop here
          </p>
        )}
        {droppable.isOver && elements.length == 0 && (
          <div className="p-4 w-full">
            <div className="h-[120px] rounded-md bg-primary/20"></div>
          </div>
        )}
        {elements.length > 0 && (
          <div className="flex flex-col w-full gap-2 p-4">
            {elements.map((element) => {
              return (
                <DesignerElementWrapper key={element.id} element={element} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Designer;
