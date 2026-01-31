'use client';
import React from 'react';
import PublishFormBtn from './PublishFormBtn';
import PreviewDialogBtn from './preview/PreviewDialogBtn';
import SaveFormBtn from './SaveFormBtn';

const NavbarDesigner = () => {
  return (
    <nav className="flex justify-between  px-4 py-2 gap-3 items-center">
      <h2 className="truncate font-medium">
        <span className="text-muted-foreground mr-2">Form:</span>
        {/* {form.name} */}
      </h2>
      <div className="flex items-center gap-2">
        <PreviewDialogBtn />
        <SaveFormBtn />
        <PublishFormBtn />
      </div>
    </nav>
  );
};

export default NavbarDesigner;
