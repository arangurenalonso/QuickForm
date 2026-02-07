import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';
import FormElementSidebar from './FormElementSidebar';
import FieldSettingsPanel from './FieldSettingsPanel';

function DesignerSidebar() {
  const { selectedField } = useDesigner();

  return (
    <aside
      className="
        w-full  h-full
        p-4 
        border-l-2 border-muted  bg-background
      "
    >
      {!selectedField && <FormElementSidebar />}
      {selectedField && <FieldSettingsPanel />}
    </aside>
  );
}

export default DesignerSidebar;
