import { FormStatusType } from '@/modules/ui/type/ui.type';
import { FORM_ACTION } from '../enum/form.enum';

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
