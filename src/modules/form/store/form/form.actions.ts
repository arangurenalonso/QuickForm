import { SectionType } from '../../components/form-designer/context/designer-context.type';
import type { FormType } from '../../types/form.types';

export type FormActions = {
  setFormSelected: (formSelected: FormType) => void;
  clearFormSelected: () => void;
  setPersistedStructure: (value: SectionType[]) => void;
  setDraftStructure: (value: SectionType[]) => void;
};
