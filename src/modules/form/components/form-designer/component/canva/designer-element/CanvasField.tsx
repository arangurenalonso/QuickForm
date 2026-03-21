import { FormFieldConfigType } from '@/modules/form/components/controlledField/common/enum/FormFieldConfigType';
import CanvasFieldHoverOverlay from './CanvasFieldHoverOverlay';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/common/libs/utils';
import useDesigner from '../../../context/useDesigner';

type DropIndicatorPosition = 'top' | 'bottom' | null;

type CanvasFieldProps = {
  sectionId: string;
  element: FormFieldConfigType;
  onEdit: (sectionId: string, fieldId: string) => void;
  dropIndicatorPosition?: DropIndicatorPosition;
};

type DropIndicatorProps = {
  position: 'top' | 'bottom';
};

const DropIndicator = ({ position }: DropIndicatorProps) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-4 z-30',
        position === 'top'
          ? 'top-0 -translate-y-1/2'
          : 'bottom-0 translate-y-1/2'
      )}
    >
      <div className="relative h-0.5 rounded-full bg-primary shadow-sm">
        <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary" />
        <span className="absolute right-0 top-1/2 h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary" />
      </div>
    </div>
  );
};

const CanvasField = ({
  sectionId,
  element,
  onEdit,
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
        onEdit={onEdit}
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
