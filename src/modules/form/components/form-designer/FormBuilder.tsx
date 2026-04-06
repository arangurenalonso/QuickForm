'use client';
import DesignerContextProvider from '@/modules/form/components/form-designer/context/DesignerProvider';
import { SectionType } from './context/designer-context.type';
import FormContent from './FormContent';

type FormBuilderProps = {
  idForm?: string | null | undefined;
  canEdit: boolean;
  onChange?: (structure: SectionType[]) => void;
  value: SectionType[];
};

const FormBuilder = ({ canEdit, onChange, value }: FormBuilderProps) => {
  return (
    <DesignerContextProvider initialSections={value}>
      <FormContent canEdit={canEdit} onChange={onChange} value={value} />
    </DesignerContextProvider>
  );
};

export default FormBuilder;
