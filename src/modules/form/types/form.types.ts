import { FormStatusType } from '@/modules/ui/type/ui.type';
import { FORM_ACTION } from '../enum/form.enum';
import { SectionType } from '../store/designer/designer.model';

export type FormType = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  status: FormStatusType<FORM_ACTION>;
  // visits: number;
  // submissions: number;
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
