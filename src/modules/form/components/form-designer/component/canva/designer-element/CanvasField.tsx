import { FormFieldConfigType } from '@/modules/form/components/controlledField/common/enum/FormFieldConfigType';
import CanvasFieldHoverOverlay from './CanvasFieldHoverOverlay';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/common/libs/utils';
import useDesigner from '@/modules/form/hooks/useDesigner';
import DropIndicator from './DropIndicator';

type DropIndicatorPosition = 'top' | 'bottom' | null;

type CanvasFieldProps = {
  sectionId: string;
  element: FormFieldConfigType;
  dropIndicatorPosition?: DropIndicatorPosition;
};

const CanvasField = ({
  sectionId,
  element,
  dropIndicatorPosition = null,
}: CanvasFieldProps) => {
  const { properties, render } = element;
  const { Component } = render;

  const { selectedField } = useDesigner();

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
      className={cn(
        'group relative',
        selectedField?.fieldId === element.id && 'ring-2 ring-ring'
      )}
      style={style}
    >
      {dropIndicatorPosition === 'top' && <DropIndicator position="top" />}

      <CanvasFieldHoverOverlay
        sectionId={sectionId}
        element={element}
        sortable={sortable}
      >
        {({ isHover }) => (
          <div
            className={cn(
              'relative transition-opacity duration-150',
              sortable.isDragging && 'opacity-0'
            )}
          >
            <div
              className={cn(
                'w-full rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
                isHover && !sortable.isDragging && 'opacity-60'
              )}
            >
              <Component {...properties} />
            </div>
          </div>
        )}
      </CanvasFieldHoverOverlay>

      {dropIndicatorPosition === 'bottom' && (
        <DropIndicator position="bottom" />
      )}
    </div>
  );
};

export default CanvasField;
