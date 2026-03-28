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
import { FORM_ACTION, FormWorkspaceTab } from '../enum/form.enum';
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
