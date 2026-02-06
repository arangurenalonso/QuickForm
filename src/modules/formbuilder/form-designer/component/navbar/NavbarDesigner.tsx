'use client';
import React from 'react';
import PublishFormBtn from './PublishFormBtn';
import PreviewDialogBtn from './preview/PreviewDialogBtn';
import SaveFormBtn from './SaveFormBtn';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import useFormStore from '@/modules/formbuilder/hooks/useFormStore';
import { FORM_ACTION } from '@/modules/formbuilder/types/form.types';

const NavbarDesigner = () => {
  const { formSelected } = useFormStore();
  return (
    <nav className="flex justify-between  px-4 py-2 gap-3 items-center">
      <h2 className="truncate font-medium">
        <span className="text-muted-foreground mr-2">Form:</span>
        {/* {form.name} */}
      </h2>
      <div className="flex items-center gap-2">
        <PreviewDialogBtn />
        <ActionGuard
          currentActions={formSelected?.status.allowedActions}
          allowedActions={[FORM_ACTION.Edit]}
        >
          <SaveFormBtn />
        </ActionGuard>
        <ActionGuard
          currentActions={formSelected?.status.allowedActions}
          allowedActions={[FORM_ACTION.Publish]}
        >
          <PublishFormBtn />
        </ActionGuard>
      </div>
    </nav>
  );
};

export default NavbarDesigner;
