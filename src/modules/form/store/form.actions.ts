import type { FormType } from '../types/form.types';

export type FormActions = {
  setFormSelected: (formSelected: FormType) => void;
  clearFormSelected: () => void;
};
