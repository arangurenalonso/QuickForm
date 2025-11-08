import { Button } from '@/common/libs/ui/button';
import { SidebarBtnDrag } from './SidebarBtnElement';

const SidebarBtnDragOverlay = ({ icon: Icon, label }: SidebarBtnDrag) => {
  return (
    <Button
      variant="outline"
      className={'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnDragOverlay;
