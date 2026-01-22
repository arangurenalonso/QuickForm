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

//  <div className="flex flex-1 min-h-0 w-full flex-col  ">
//       <DesignerContextProvider>
//         <NavbarDesigner />
//         <div className="flex-1 min-h-0 w-full p-5 bg-green-950">
//           <FormBuilder id={id} />
//         </div>
//       </DesignerContextProvider>
//     </div>
