export type ResultResponse = {
  isSuccess: boolean;
  message: string;
};
export type ResultTResponse<T> = ResultResponse & {
  data?: T;
};
