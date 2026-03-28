import { SectionType } from '../../components/form-designer/context/designer-context.type';
import { FormType, TypesRender } from '../../types/form.types';

export interface FormModel {
  formSelected?: FormType | undefined | null;
  persistedStructure: SectionType[];
  draftStructure: SectionType[];
  typeRender: TypesRender[];
}
