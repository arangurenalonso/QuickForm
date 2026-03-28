import { SectionType } from '../../components/form-designer/context/designer-context.type';
import type { FormType, TypesRender } from '../../types/form.types';

export type FormActions = {
  setFormSelected: (formSelected: FormType) => void;
  clearFormSelected: () => void;
  setPersistedStructure: (value: SectionType[]) => void;
  setDraftStructure: (value: SectionType[]) => void;
  setTypeRender: (value: TypesRender[]) => void;
  setRenderMode: (idTypeRender: string) => void;
  updateBasicInformation: (name: string, description?: string) => Promise<void>;
};
