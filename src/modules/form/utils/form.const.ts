import {
  LucideIcon,
  LayoutTemplate,
  PanelsTopLeft,
  Rows3,
  ListOrdered,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  AlertCircle,
  XCircle,
  PauseCircle,
  Send,
  Eye,
  CircleDashed,
} from 'lucide-react';
import {
  FORM_ACTION,
  FormRenderType,
  FormWorkspaceTab,
} from '../enum/form.enum';
import { FormWorkspaceTabType } from '../types/form.types';

export const FORM_ACTION_VALUES = Object.values(FORM_ACTION);

export const tabs: FormWorkspaceTabType[] = [
  { label: 'Build', segment: FormWorkspaceTab.builder },
  { label: 'Settings', segment: FormWorkspaceTab.settings },
  { label: 'Publish', segment: FormWorkspaceTab.publish },
];

export const RENDER_MODE_ICON_MAP: Record<string, LucideIcon> = {
  LayoutTemplate,
  PanelsTopLeft,
  Rows3,
  ListOrdered,
};

export const STATUS_ICON_MAP: Record<string, LucideIcon> = {
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
