import DesignerContextProvider from '@/modules/formbuilder/form-designer/context/DesignerProvider';
import FormBuilder from '../../form-designer/FormBuilder';
import NavbarDesigner from '../component/navbar/NavbarDesigner';

type FormBuilderContainerProps = {
  id?: string | null | undefined;
};

const FormBuilderView = ({ id }: FormBuilderContainerProps) => {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr]  ">
      <DesignerContextProvider>
        <NavbarDesigner />
        <div className="min-h-0 w-full  ">
          <FormBuilder id={id} />
        </div>
      </DesignerContextProvider>
    </div>
  );
};

export default FormBuilderView;
