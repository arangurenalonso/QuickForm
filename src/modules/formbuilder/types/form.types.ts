export type formType = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  published: boolean;
  visits: number;
  submissions: number;
};

export type formStatsType = {
  submissions: number;
  submissionRate: number;
  bounceRate: number;
  visits: number;
};

export type CreateFormRequest = { name: string; description?: string };
