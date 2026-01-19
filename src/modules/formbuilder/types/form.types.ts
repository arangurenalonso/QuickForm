import { FormStatusType } from '@/modules/ui/type/ui.type';

export type formType = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  status: FormStatusType<FORM_ACTION>;
  // visits: number;
  // submissions: number;
};

export enum FORM_ACTION {
  Pause = 'FormPause',
  ViewSubmissions = 'ViewSubmissions',
  Resume = 'FormResume',
  Publish = 'FormPublish',
  Edit = 'FormEdit',
  Close = 'FormClose',
}

export type formStatsType = {
  submissions: number;
  submissionRate: number;
  bounceRate: number;
  visits: number;
};

export type CreateFormRequest = { name: string; description?: string };
