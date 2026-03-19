'use client';
import React from 'react';
import PreviewDialogBtn from './navbar-btn/preview/PreviewDialogBtn';
import SaveFormBtn from './navbar-btn/SaveFormBtn';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import useFormStore from '@/modules/form/hooks/useFormStore';
import { FORM_ACTION } from '@/modules/form/enum/form.enum';
import PublishFormBtn from './navbar-btn/publish/PublishFormBtn';

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
        {formSelected && (
          <ActionGuard
            currentActions={formSelected?.status.allowedActions}
            allowedActions={[FORM_ACTION.Publish]}
          >
            <PublishFormBtn idForm={formSelected.id} />
          </ActionGuard>
        )}
      </div>
    </nav>
  );
};

export default NavbarDesigner;
