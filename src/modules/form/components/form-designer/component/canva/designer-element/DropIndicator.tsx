import { cn } from '@/common/libs/utils';

type DropIndicatorProps = {
  position: 'top' | 'bottom';
};

const DropIndicator = ({ position }: DropIndicatorProps) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-4 z-30',
        position === 'top'
          ? 'top-0 -translate-y-1/2'
          : 'bottom-0 translate-y-1/2'
      )}
    >
      <div className="relative h-0.5 rounded-full bg-primary shadow-sm">
        <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary" />
        <span className="absolute right-0 top-1/2 h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary" />
      </div>
    </div>
  );
};

export default DropIndicator;
