import { LucideIcon, CircleDashed } from 'lucide-react';
import { FormRenderType, FORM_ACTION } from '../enum/form.enum';
import {
  FORM_ACTION_VALUES,
  STATUS_ICON_MAP,
  RENDER_MODE_ICON_MAP,
} from './form.const';
import { FormStatusType } from '@/modules/ui/type/ui.type';

export const getStatusIcon = (iconName?: string | null): LucideIcon => {
  if (!iconName) return CircleDashed;
  return STATUS_ICON_MAP[iconName] ?? CircleDashed;
};

export const getStatusClasses = (color?: string | null) => {
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
};
export function getRenderModeIcon(iconName?: string | null): LucideIcon {
  if (!iconName) return CircleDashed;
  return RENDER_MODE_ICON_MAP[iconName] ?? CircleDashed;
}

export function isFormStatusDto<T>(value: unknown): value is FormStatusType<T> {
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
export const FORM_RENDER_TYPE_DATA: Record<
  FormRenderType,
  { id: string; name: FormRenderType }
> = {
  [FormRenderType.Default]: {
    id: 'E115B787-1E69-4A93-A23B-C7C5CD9FF588',
    name: FormRenderType.Default,
  },
  [FormRenderType.Tabs]: {
    id: '9BBFA25F-7025-488C-8360-27F097590E08',
    name: FormRenderType.Tabs,
  },
  [FormRenderType.Accordion]: {
    id: '221959BF-B21F-44FF-8990-63DAB8094645',
    name: FormRenderType.Accordion,
  },
  [FormRenderType.Stepper]: {
    id: '180D167D-CEB5-4FBA-B0F5-F929396410ED',
    name: FormRenderType.Stepper,
  },
};

export function isFormAction(value: unknown): value is FORM_ACTION {
  return (
    typeof value === 'string' &&
    FORM_ACTION_VALUES.includes(value as FORM_ACTION)
  );
}
export function isFormActionArray(value: unknown): value is FORM_ACTION[] {
  return Array.isArray(value) && value.every(isFormAction);
}
