'use client';

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Eye,
  LucideIcon,
  PauseCircle,
  Send,
  XCircle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/common/libs/ui/tooltip';
import { cn } from '@/common/libs/utils';

type FormStatusDto = {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
};
export function isFormStatusDto(value: unknown): value is FormStatusDto {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    (candidate.description === undefined ||
      candidate.description === null ||
      typeof candidate.description === 'string') &&
    (candidate.icon === undefined ||
      candidate.icon === null ||
      typeof candidate.icon === 'string') &&
    (candidate.color === undefined ||
      candidate.color === null ||
      typeof candidate.color === 'string')
  );
}
type StatusBadgeProps = {
  status?: FormStatusDto | null;
  className?: string;
  size?: 'sm' | 'md';
};

const STATUS_ICON_MAP: Record<string, LucideIcon> = {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  AlertCircle,
  XCircle,
  PauseCircle,
  Send,
  Eye,
  CircleDashed,
};

function getStatusIcon(iconName?: string | null): LucideIcon {
  if (!iconName) return CircleDashed;
  return STATUS_ICON_MAP[iconName] ?? CircleDashed;
}

function getStatusClasses(color?: string | null) {
  switch (color) {
    case 'success':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
    case 'warning':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400';
    case 'danger':
    case 'error':
      return 'border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400';
    case 'info':
      return 'border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400';
    case 'neutral':
    default:
      return 'border-border bg-accent text-accent-foreground';
  }
}

export const StatusBadge = ({
  status,
  className,
  size = 'md',
}: StatusBadgeProps) => {
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
