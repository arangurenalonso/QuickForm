'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/common/libs/ui/tooltip';
import { cn } from '@/common/libs/utils';
import { FormStatusType } from '@/modules/ui/type/ui.type';
import {
  getStatusIcon,
  getStatusClasses,
} from '@/modules/form/utils/form.method';

type StatusBadgeProps<T> = {
  status?: FormStatusType<T> | null;
  className?: string;
  size?: 'sm' | 'md';
};

export const StatusBadge = <T,>({
  status,
  className,
  size = 'md',
}: StatusBadgeProps<T>) => {
  if (!status) return null;

  const Icon = getStatusIcon(status.icon);

  const badge = (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border font-medium transition-colors',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        getStatusClasses(status.color),
        className
      )}
    >
      <Icon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      <span>{status.name}</span>
    </span>
  );

  if (!status.description?.trim()) {
    return badge;
  }

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="max-w-[260px] rounded-xl border border-border bg-popover text-popover-foreground shadow-md"
        >
          <p className="text-sm leading-6">{status.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default StatusBadge;
