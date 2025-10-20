import { Button } from '@/components/ui/button';
import { cn } from '@/common/libs/utils';
import { useDraggable } from '@dnd-kit/core';

export type SidebarBtnDrag = {
  icon: React.ElementType;
  type: string;
  label: string;
};

const SidebarBtnElement = ({ icon: Icon, label, type }: SidebarBtnDrag) => {
  const draggable = useDraggable({
    id: `designer-btn-${type}`,
    data: {
      type: type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        'flex flex-col gap-2 h-[120px] w-full cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;
