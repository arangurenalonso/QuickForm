export type ResultResponse = {
  isSuccess: boolean;
  message: string;
  redirectUrl?: string;
};
export type ResultTResponse<T> = ResultResponse & {
  data?: T;
};
