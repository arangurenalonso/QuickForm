import React from 'react';
import {
  type SidebarBtnBaseProps,
  SidebarBtnBase,
} from '../component/sidebar/SidebarBtnBase';

const SidebarBtnDragOverlay = ({ icon, label }: SidebarBtnBaseProps) => {
  return (
    <SidebarBtnBase
      icon={icon}
      label={label}
      className="opacity-80 pointer-events-none"
    />
  );
};

export default SidebarBtnDragOverlay;
