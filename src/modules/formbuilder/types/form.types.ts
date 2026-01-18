import { FormStatusType } from '@/modules/ui/type/ui.type';

export type formType = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  status: FormStatusType<FormAction>;
  // visits: number;
  // submissions: number;
};

export enum FormAction {
  FormPause = 'FormPause',
  ViewResponses = 'ViewResponses',
  FormResume = 'FormResume',
  FormPublish = 'FormPublish',
  FormEdit = 'FormEdit',
  FormClose = 'FormClose',
}

export type formStatsType = {
  submissions: number;
  submissionRate: number;
  bounceRate: number;
  visits: number;
};

export type CreateFormRequest = { name: string; description?: string };
