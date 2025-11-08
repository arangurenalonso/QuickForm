import useDesigner from '@/hooks/useDesigner';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/common/libs/utils';
import HoverDesignerElementWrapper from './HoverDesignerElementWrapper';
import { FormFieldConfigType } from '../../controlledField/enum/FormFieldConfigType';

type DesignerElementWrapperProps = {
  element: FormFieldConfigType;
};

const DesignerElementWrapper = ({ element }: DesignerElementWrapperProps) => {
  const { properties, render } = element;
  const { Component } = render;

  const { handleSelectedElement } = useDesigner();

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) {
    return null;
  }
  return (
    <div
      className="w-full"
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSelectedElement(element);
      }}
    >
      <HoverDesignerElementWrapper element={element}>
        {({ isHover }) => {
          return (
            <div
              className={cn(
                'w-fullrounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
                isHover && 'opacity-15'
              )}
            >
              <Component {...properties} />
            </div>
          );
        }}
      </HoverDesignerElementWrapper>
    </div>
  );
};

export default DesignerElementWrapper;
