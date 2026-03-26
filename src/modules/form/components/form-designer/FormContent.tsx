'use client';

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { useCallback, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DrawerHost from '@/modules/ui/components/DrawerHost';
import { useBoundStore } from '@/store';
import { Button } from '@/common/libs/ui/button';
import Designer from './component/canva/Designer';
import SectionsTabs from './component/SectionsTabs';
import FormElementSidebar from './component/sidebar/FormElementSidebar';
import { SectionType } from './context/designer-context.type';
import useDesigner from './context/useDesigner';
import DragPreviewOverlay from './hook/DragPreviewOverlay';

type FormContentProps = {
  idForm?: string | null | undefined;
  canEdit: boolean;
  onChange?: (structure: SectionType[]) => void;
  value: SectionType[];
};

const FormContent = ({ canEdit, onChange, value }: FormContentProps) => {
  const openDrawer = useBoundStore((s) => s.openDrawer);
  const { handleSelectedField, sections, setFormStructure } = useDesigner();

  useEffect(() => {
    console.log('Setting form structure with value from props:', value);
    setFormStructure(value);
  }, [value, setFormStructure]);

  useEffect(() => {
    if (onChange) {
      console.log('Calling onChange with sections:', sections);
      onChange(sections);
    }
  }, [sections, onChange]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 300, tolerance: 5 },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleOpenAddDrawer = useCallback(() => {
    handleSelectedField(null);
    openDrawer({
      id: 'designer-add-field',
      title: 'Add field',
      titleDescription: 'Choose an element to add to the active section.',
      content: <FormElementSidebar />,
      side: 'left',
      showOverlay: false,
    });
  }, [handleSelectedField, openDrawer]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}>
      <div className="grid h-full w-full min-w-0 grid-rows-[auto_1fr]">
        <SectionsTabs />

        <div className="relative min-h-0 w-full min-w-0 bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-auto overflow-x-hidden">
          <Designer canEdit={canEdit} />

          {canEdit && (
            <Button
              type="button"
              className="absolute bottom-4 right-4 z-20 gap-2 shadow-lg"
              onClick={handleOpenAddDrawer}
            >
              <Plus className="h-4 w-4" />
              Add field
            </Button>
          )}
        </div>
      </div>
      <DrawerHost />
      <DragPreviewOverlay />
    </DndContext>
  );
};

export default FormContent;
