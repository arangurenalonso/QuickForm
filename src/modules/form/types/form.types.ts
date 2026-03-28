import { FormStatusType } from '@/modules/ui/type/ui.type';
import { FORM_ACTION, FormRenderType } from '../enum/form.enum';

import { SectionType } from '../components/form-designer/context/designer-context.type';

export type RenderMode = {
  id: string;
  keyName: FormRenderType;
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
  keyName: FormRenderType;
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

export type FormTemplateType = {
  sections: SectionType[];
  form: FormType;
};

export type FormWorkspaceTabType = {
  label: string;
  segment: FormWorkspaceTabSegment;
};
