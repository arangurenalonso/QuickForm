import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { cn } from '@/common/libs/utils';
import HoverDesignerElementWrapper from './HoverDesignerElementWrapper';
import { FormFieldConfigType } from '../component/controlledField/enum/FormFieldConfigType';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

type DesignerElementWrapperProps = {
  element: FormFieldConfigType;
};

const DesignerElementWrapper = ({ element }: DesignerElementWrapperProps) => {
  const { properties, render } = element;
  const { Component } = render;
  const { handleSelectedElement } = useDesigner();

  const sortable = useSortable({
    id: element.id,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  // ✅ Si está arrastrando, sortable maneja el "ghosting" bien
  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      className={cn(sortable.isDragging && 'opacity-50')}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSelectedElement(element);
      }}
    >
      <HoverDesignerElementWrapper element={element}>
        {({ isHover }) => (
          <div className="relative">
            {/* ✅ Drag handle (solo este arrastra) */}
            {isHover && (
              <button
                ref={sortable.setActivatorNodeRef}
                {...sortable.attributes}
                {...sortable.listeners}
                className="absolute left-2 top-2 z-20 rounded-md border bg-background/80 p-1 hover:bg-background"
                onClick={(e) => {
                  // ✅ no seleccionar al intentar arrastrar
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
