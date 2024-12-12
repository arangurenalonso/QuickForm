import useDesigner from '@/hooks/useDesigner';
import FormElementSidebar from './FormElementSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';

function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside
      className="
                w-full  h-full
                p-4 
                overflow-hidden
                border-l-2 border-muted  bg-background
                "
    >
      {!selectedElement && <FormElementSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
