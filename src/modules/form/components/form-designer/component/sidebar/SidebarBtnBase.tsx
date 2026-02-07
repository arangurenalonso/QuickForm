import React from 'react';
import { Button } from '@/common/libs/ui/button';
import { cn } from '@/common/libs/utils';

export type SidebarBtnBaseProps = {
  icon: React.ElementType;
  label: string;
  className?: string;
};

export function SidebarBtnBase({
  icon: Icon,
  label,
  className,
}: SidebarBtnBaseProps) {
  return (
    <Button
      variant="outline"
      className={cn('flex flex-col gap-2 h-[120px] w-[120px]', className)}
      type="button"
    >
      <Icon className="h-8 w-8 text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
