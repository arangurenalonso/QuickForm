import DesignerContextProvider from '@/modules/formbuilder/form-designer/context/DesignerProvider';
import FormBuilder from '../../form-designer/FormBuilder';
import NavbarDesigner from '../component/navbar/NavbarDesigner';

type FormBuilderContainerProps = {
  idForm?: string | null | undefined;
};

const FormBuilderView = ({ idForm }: FormBuilderContainerProps) => {
  return (
    <div className="grid h-full w-full min-w-0 grid-rows-[auto_1fr]">
      <DesignerContextProvider>
        <NavbarDesigner />
        <div className="min-h-0 w-full min-w-0">
          <FormBuilder idForm={idForm} />
        </div>
      </DesignerContextProvider>
    </div>
  );
};
export default FormBuilderView;
