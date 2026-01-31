// 1) Wrapper genérico para cualquier regla con mensaje
export type RuleWithMessage<T> = {
  value: T;
  messageTemplate: string;
  message: string;
};

// 2) Mapea cualquier "RulesBase" a su versión "con mensaje"
export type WithMessages<T> = {
  [K in keyof T]?: RuleWithMessage<NonNullable<T[K]>>;
};
