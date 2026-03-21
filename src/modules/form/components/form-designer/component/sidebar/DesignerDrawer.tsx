'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/common/libs/ui/sheet';
import FieldSettingsPanel from './FieldSettingsPanel';
import FormElementSidebar from './FormElementSidebar';

type DesignerDrawerMode = 'add' | 'edit' | null;

type DesignerDrawerProps = {
  open: boolean;
  mode: DesignerDrawerMode;
  onClose: () => void;
};
const DesignerDrawer = ({ open, mode, onClose }: DesignerDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={(value) => !value && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="grid h-full grid-rows-[auto_1fr]">
          <SheetHeader className="border-b px-6 py-4 text-left">
            <SheetTitle>
              {mode === 'add' ? 'Add field' : 'Edit field'}
            </SheetTitle>
            <SheetDescription>
              {mode === 'add'
                ? 'Choose an element to add to the active section.'
                : 'Update the selected field properties and rules.'}
            </SheetDescription>
          </SheetHeader>

          <div className="min-h-0 overflow-y-auto p-4">
            {mode === 'add' && <FormElementSidebar />}
            {mode === 'edit' && <FieldSettingsPanel />}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DesignerDrawer;
