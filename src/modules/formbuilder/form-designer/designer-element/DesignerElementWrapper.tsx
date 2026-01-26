import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { cn } from '@/common/libs/utils';
import HoverDesignerElementWrapper from './HoverDesignerElementWrapper';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormFieldConfigType } from '../component/controlledField/common/enum/FormFieldConfigType';

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
      <HoverDesignerElementWrapper
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
      </HoverDesignerElementWrapper>
    </div>
  );
};

export default DesignerElementWrapper;
