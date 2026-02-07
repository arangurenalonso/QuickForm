export type RuleWithMessage<T> = {
  value: T;
  messageTemplate: string;
  message: string;
};

export type WithMessages<T> = {
  [K in keyof T]?: RuleWithMessage<NonNullable<T[K]>>;
};
