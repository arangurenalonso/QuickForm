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

import Designer from './component/canva/Designer';
import SectionsTabs from './component/SectionsTabs';
import useFormStore from '../../hooks/useFormStore';
import { useToast } from '@/hooks/use-toast';
import useDesigner from './context/useDesigner';
import DragPreviewOverlay from './hook/DragPreviewOverlay';
import { Button } from '@/common/libs/ui/button';
import FormElementSidebar from './component/sidebar/FormElementSidebar';
import { useBoundStore } from '@/store';
import DrawerHost from '@/modules/ui/components/DrawerHost';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import { FORM_ACTION } from '../../enum/form.enum';

type FormBuilderProps = {
  idForm?: string | null | undefined;
};

const FormBuilder = ({ idForm }: FormBuilderProps) => {
  const { getFormDetail, error, handleClearFormSelected, formSelected } =
    useFormStore();
  const openDrawer = useBoundStore((s) => s.openDrawer);
  const { setFormStructure, handleSelectedField } = useDesigner();
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      handleClearFormSelected();
    };
  }, [handleClearFormSelected]);

  const handleGetFormStructure = useCallback(async () => {
    if (!idForm) {
      setFormStructure([]);
      return;
    }

    const data = await getFormDetail(idForm);
    if (!data) return;

    setFormStructure(data.structure);
  }, [idForm, getFormDetail, setFormStructure]);

  useEffect(() => {
    handleGetFormStructure();
  }, [handleGetFormStructure]);

  useEffect(() => {
    if (!error) return;

    const message = error.message ?? JSON.stringify(error);

    toast({
      title: 'Error',
      description: `Something went wrong, please try again later. ${message}`,
      variant: 'destructive',
    });
  }, [error, toast]);

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
          <Designer />

          {formSelected && (
            <ActionGuard
              currentActions={formSelected.status.allowedActions}
              allowedActions={[FORM_ACTION.Edit]}
            >
              <Button
                type="button"
                className="absolute bottom-4 right-4 z-20 gap-2 shadow-lg"
                onClick={handleOpenAddDrawer}
              >
                <Plus className="h-4 w-4" />
                Add field
              </Button>
            </ActionGuard>
          )}
        </div>
      </div>
      <DrawerHost />

      <DragPreviewOverlay />
    </DndContext>
  );
};

export default FormBuilder;
