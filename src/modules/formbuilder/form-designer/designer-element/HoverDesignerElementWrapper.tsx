import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';
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

  return (
    <div
      className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <div className="z-10">
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground font-bold text-m">
              Click for properties or drag to move
            </p>
          </div>
        </div>
      )}

      {children({ isHover })}
    </div>
  );
};

export default HoverDesignerElementWrapper;
