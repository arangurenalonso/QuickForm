import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { cn } from '@/common/libs/utils';
import HoverDesignerElementWrapper from './HoverDesignerElementWrapper';
import { FormFieldConfigType } from '../component/controlledField/enum/FormFieldConfigType';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

type DesignerElementWrapperProps = {
  sectionId: string;
  element: FormFieldConfigType;
};

const DesignerElementWrapper = ({
  sectionId,
  element,
}: DesignerElementWrapperProps) => {
  const { properties, render } = element;
  const { Component } = render;

  const { handleSelectedField } = useDesigner();

  const sortable = useSortable({
    id: element.id, // id del field
    data: {
      type: element.type,
      sectionId,
      fieldId: element.id,
      isDesignerField: true,
    },
  });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      className={cn(sortable.isDragging && 'opacity-50')}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSelectedField({ sectionId, fieldId: element.id });
      }}
    >
      <HoverDesignerElementWrapper sectionId={sectionId} element={element}>
        {({ isHover }) => (
          <div className="relative">
            {isHover && (
              <button
                ref={sortable.setActivatorNodeRef}
                {...sortable.attributes}
                {...sortable.listeners}
                className="absolute left-2 top-2 z-20 rounded-md border bg-background/80 p-1 hover:bg-background"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                aria-label="Drag"
                type="button"
              >
                <GripVertical className="h-4 w-4" />
              </button>
            )}

            <div
              className={cn(
                'w-full rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
                isHover && 'opacity-15'
              )}
            >
              <Component {...properties} />
            </div>
          </div>
        )}
      </HoverDesignerElementWrapper>
    </div>
  );
};

export default DesignerElementWrapper;
