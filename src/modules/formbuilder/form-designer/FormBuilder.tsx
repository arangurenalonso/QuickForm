'use client';

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';

import Designer from './Designer';
import DragOverlayWrapper from './DragOverlayWrapper';
import DesignerSidebar from './component/sidebar/DesignerSidebar';
import SectionsTabs from './SectionsTabs';

type FormBuilderProps = {
  id?: string | null | undefined;
};

const FormBuilder = ({}: FormBuilderProps) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 300, tolerance: 5 },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}>
      {/* ✅ min-w-0 evita que el grid se expanda por hijos */}
      <div className="w-full h-full min-w-0 grid grid-cols-12 gap-2">
        {/* ✅ overflow-x-hidden corta desbordes horizontales */}
        <div className="col-span-12 md:col-span-8 min-w-0 bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-auto overflow-x-hidden">
          <div className="grid h-full w-full min-w-0 grid-rows-[auto_1fr]">
            <SectionsTabs />
            <div className="min-h-0 w-full min-w-0">
              <Designer />
            </div>
          </div>
        </div>

        {/* sidebar */}
        <div className="col-span-12 md:col-span-4 min-w-0 overflow-auto">
          <DesignerSidebar />
        </div>
      </div>

      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
