import { FormStatusType } from '@/modules/ui/type/ui.type';
import { FORM_ACTION } from '../enum/form.enum';

import { SectionType } from '../components/form-designer/context/designer-context.type';
import {
  LucideIcon,
  LayoutTemplate,
  PanelsTopLeft,
  Rows3,
  ListOrdered,
  CircleDashed,
} from 'lucide-react';

export enum FormRenderType {
  Default = 'Default',
  Tabs = 'Tabs',
  Accordion = 'Accordion',
  Stepper = 'Stepper',
}
const RENDER_MODE_ICON_MAP: Record<string, LucideIcon> = {
  LayoutTemplate,
  PanelsTopLeft,
  Rows3,
  ListOrdered,
};

export function getRenderModeIcon(iconName?: string | null): LucideIcon {
  if (!iconName) return CircleDashed;
  return RENDER_MODE_ICON_MAP[iconName] ?? CircleDashed;
}

export const FORM_RENDER_TYPE_DATA: Record<
  FormRenderType,
  { id: string; name: string }
> = {
  [FormRenderType.Default]: {
    id: 'E115B787-1E69-4A93-A23B-C7C5CD9FF588',
    name: 'Default',
  },
  [FormRenderType.Tabs]: {
    id: '9BBFA25F-7025-488C-8360-27F097590E08',
    name: 'Tabs',
  },
  [FormRenderType.Accordion]: {
    id: '221959BF-B21F-44FF-8990-63DAB8094645',
    name: 'Accordion',
  },
  [FormRenderType.Stepper]: {
    id: '180D167D-CEB5-4FBA-B0F5-F929396410ED',
    name: 'Stepper',
  },
};
export type RenderMode = {
  id: string;
  keyName: string;
};

export type FormType = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  status: FormStatusType<FORM_ACTION>;
  renderMode: RenderMode;
  submissions: number;
};

export type TypesRender = {
  id: string;
  keyName: string;
  description?: string;
  icon: string;
  color: string;
};

export type SearchFormType = FormType & {
  updated: string;
  actions: FORM_ACTION[];
};

export type formStatsType = {
  submissions: number;
  submissionRate: number;
  bounceRate: number;
  visits: number;
};

export type CreateFormRequest = { name: string; description?: string };

export type FormWorkspaceTabSegment = 'builder' | 'settings' | 'publish';

export enum FormWorkspaceTab {
  builder = 'builder',
  settings = 'settings',
  publish = 'publish',
}

export type FormTemplateType = {
  sections: SectionType[];
  form: FormType;
};
