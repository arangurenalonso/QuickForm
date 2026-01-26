import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';
import { Button } from '@/common/libs/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import { FormFieldConfigType } from '../component/controlledField/common/enum/FormFieldConfigType';

type HoverStateProps = {
  isHover: boolean;
};

type HoverDesignerElementWrapperProps = {
  sectionId: string;
  element: FormFieldConfigType;
  sortable: ReturnType<typeof useSortable>;
  children: (args: HoverStateProps) => JSX.Element;
};

const HoverDesignerElementWrapper = ({
  sectionId,
  element,
  sortable,
  children,
}: HoverDesignerElementWrapperProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { removeField } = useDesigner();

  return (
    <div
      className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <div className="z-10">
          {/* Drag handle */}
          <button
            ref={sortable.setActivatorNodeRef}
            {...sortable.attributes}
            {...sortable.listeners}
            className="absolute left-0 top-0 z-20
                           h-full w-14
                           flex items-center justify-center
                           border-r
                           bg-slate-800/80
                           hover:bg-background
                           cursor-grab"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Drag"
            type="button"
          >
            <GripVertical className="h-44 w-4" />
          </button>
          {/* 🗑 Delete Handler*/}
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeField(sectionId, element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          {/* 💡 Hint */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground font-bold text-m">
              Click for properties · Drag using the left handle
            </p>
          </div>
        </div>
      )}

      {children({ isHover })}
    </div>
  );
};

export default HoverDesignerElementWrapper;
