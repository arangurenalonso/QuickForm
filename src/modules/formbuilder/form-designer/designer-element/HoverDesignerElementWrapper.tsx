import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';
import { cn } from '@/common/libs/utils';
import { Button } from '@/common/libs/ui/button';
import { FormFieldConfigType } from '../component/controlledField/enum/FormFieldConfigType';

type HoverStateProps = {
  isHover: boolean;
};
type HoverDesignerElementWrapperProps = {
  element: FormFieldConfigType;
  children: (args: HoverStateProps) => JSX.Element;
};
const HoverDesignerElementWrapper = ({
  element,
  children,
}: HoverDesignerElementWrapperProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { removeElement } = useDesigner();
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });
  return (
    <div
      className="relative flex flex-col text-foreground hover:cursor-pointer 
    rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn('absolute w-full top-0 h-1/2 rounded-t-md ')}
      ></div>
      {topHalf.isOver && (
        <div className="absolute w-full top-0 h-[7px] rounded-md  bg-primary rounded-b-none"></div>
      )}
      {isHover && (
        <div className=" z-10">
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500 "
              // variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse ">
            <p className="text-muted-foreground font-bold text-m">
              Click for properties or drag to move
            </p>
          </div>
        </div>
      )}
      <div
        ref={bottomHalf.setNodeRef}
        className={cn('absolute w-full bottom-0 h-1/2 rounded-b-md ')}
      ></div>
      {bottomHalf.isOver && (
        <div className="absolute w-full bottom-0 h-[7px] rounded-md bg-primary rounded-t-none"></div>
      )}
      {children({
        isHover,
      })}
    </div>
  );
};

export default HoverDesignerElementWrapper;
