import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import FormElementSidebar from './FormElementSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';

function DesignerSidebar() {
  const { selectedField } = useDesigner();

  return (
    <aside
      className="
        w-full  h-full
        p-4 
        overflow-hidden
        border-l-2 border-muted  bg-background
      "
    >
      {!selectedField && <FormElementSidebar />}
      {selectedField && <PropertiesFormSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
