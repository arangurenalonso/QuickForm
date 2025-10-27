export type RulesValidate = {
  id: string;
  label: string;
  test: (value: string) => boolean;
  group?: 'left' | 'right';
};
