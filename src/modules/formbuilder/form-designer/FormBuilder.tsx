'use client';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import Designer from './Designer';
import DragOverlayWrapper from './DragOverlayWrapper';
import DesignerSidebar from './component/sidebar/DesignerSidebar';

type FormBuilderProps = {
  id?: string | null | undefined;
};

const FormBuilder = ({ id }: FormBuilderProps) => {
  console.log('FormBuilder id:', id);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <div
        className="
          w-full h-full 
          grid grid-cols-12  
          gap-2
        "
      >
        <div
          className="
              col-span-12 md:col-span-8 
              bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]
              overflow-auto
          "
        >
          <Designer />
        </div>
        <div
          className="
              col-span-12 md:col-span-4 overflow-auto bg-red-800 
            "
        >
          <DesignerSidebar />
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
