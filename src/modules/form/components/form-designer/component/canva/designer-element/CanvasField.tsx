import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';
import { cn } from '@/common/libs/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormFieldConfigType } from '@/modules/form/components/controlledField/common/enum/FormFieldConfigType';
import CanvasFieldHoverOverlay from './CanvasFieldHoverOverlay';

type CanvasFieldProps = {
  sectionId: string;
  element: FormFieldConfigType;
};

const CanvasField = ({ sectionId, element }: CanvasFieldProps) => {
  const { properties, render } = element;
  const { Component } = render;

  const { handleSelectedField } = useDesigner();

  const sortable = useSortable({
    id: element.id,
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
      <CanvasFieldHoverOverlay
        sectionId={sectionId}
        element={element}
        sortable={sortable}
      >
        {({ isHover }) => (
          <div className="relative">
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
      </CanvasFieldHoverOverlay>
    </div>
  );
};

export default CanvasField;
