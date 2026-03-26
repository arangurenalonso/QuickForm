'use client';

import { FormFieldConfigType } from '@/modules/form/components/controlledField/common/enum/FormFieldConfigType';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/common/libs/utils';
import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';
import DropIndicator from './DropIndicator';
import CanvasFieldHoverOverlay from './CanvasFieldHoverOverlay';
import { getFriendlyFieldTypeName } from '@/modules/form/components/controlledField/common/enum/FieldType';
type DropIndicatorPosition = 'top' | 'bottom' | null;

type CanvasFieldProps = {
  sectionId: string;
  element: FormFieldConfigType;
  dropIndicatorPosition?: DropIndicatorPosition;
  canEdit: boolean;
};

const CanvasField = ({
  sectionId,
  element,
  dropIndicatorPosition = null,
  canEdit,
}: CanvasFieldProps) => {
  const { selectedField } = useDesigner();

  const isSelected = selectedField?.fieldId === element.id;

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
  if (!element) return null;
  const { properties, render } = element;
  const { Component } = render;

  return (
    <div
      ref={sortable.setNodeRef}
      className={cn(
        'group relative',
        isSelected && 'ring-2 ring-ring rounded-lg'
      )}
      style={style}
    >
      {dropIndicatorPosition === 'top' && <DropIndicator position="top" />}

      <CanvasFieldHoverOverlay
        sectionId={sectionId}
        element={element}
        sortable={sortable}
        canEdit={canEdit}
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
                'relative w-full rounded-md bg-accent/40 px-4 py-3 pointer-events-none opacity-100 transition-all',
                isHover && !sortable.isDragging && 'opacity-80',
                isSelected && 'bg-accent/55'
              )}
            >
              <div
                className="
                absolute left-[-24px] top-[10px] z-10 
                -rotate-45 
                rounded-sm border bg-background px-5  text-[9px] font-semibold  tracking-[0.08em] text-muted-foreground shadow-sm"
              >
                {getFriendlyFieldTypeName(element.type)}
              </div>
              <div className="pl-3">
                <Component {...properties} />
              </div>
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
