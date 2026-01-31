export type PreviewFormVariant =
  | 'simple'
  | 'section-cards'
  | 'tabs'
  | 'stepper';

export const PREVIEW_FORM_VARIANTS: {
  value: PreviewFormVariant;
  label: string;
  description: string;
}[] = [
  {
    value: 'simple',
    label: 'Simple',
    description: 'One column, sections stacked.',
  },
  {
    value: 'section-cards',
    label: 'Cards',
    description: 'Each section inside a card.',
  },
  { value: 'tabs', label: 'Tabs', description: 'Each section is a tab.' },
  {
    value: 'stepper',
    label: 'Stepper',
    description: 'Wizard-like, one section per step.',
  },
];
