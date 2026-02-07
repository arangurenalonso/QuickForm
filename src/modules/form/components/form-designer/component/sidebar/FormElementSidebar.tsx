import { FormElements } from '@/modules/form/components/controlledField/FormElements';
import SidebarBtnElement from './SidebarBtnElement';

const FormElementSidebar = () => {
  return (
    <div>
      <h2 className="text-xl">Elements</h2>
      <div
        className="
          w-full
          grid grid-cols-2  
          gap-4
        "
      >
        {Object.entries(FormElements).map(([key, value]) => (
          <div key={key} className=" col-span-1">
            <SidebarBtnElement
              icon={value.icon}
              type={value.type}
              label={value.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormElementSidebar;
