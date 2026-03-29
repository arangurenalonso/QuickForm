import { MousePointerClick } from 'lucide-react';

function BrandMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
      <MousePointerClick className="h-5 w-5" />
    </div>
  );
}

const AppLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <BrandMark />
      <div>
        <p className="text-sm font-semibold text-foreground">QuickForm</p>
        <p className="text-xs text-muted-foreground">Workspace</p>
      </div>
    </div>
  );
};

export default AppLogo;
