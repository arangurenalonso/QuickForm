import { MousePointerClick } from 'lucide-react';

const QuickFormFooter = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <MousePointerClick className="h-4 w-4" />
          </div>
          <span>© 2026 QuickForm. Build forms with clarity.</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className="transition hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default QuickFormFooter;
