'use client';

import { FileText, Info } from 'lucide-react';
import PreviewDialogBtn from './navbar-btn/preview/PreviewDialogBtn';
import SaveFormBtn from './navbar-btn/SaveFormBtn';
import PublishFormBtn from './navbar-btn/publish/PublishFormBtn';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import useFormStore from '@/modules/form/hooks/useFormStore';
import { FORM_ACTION } from '@/modules/form/enum/form.enum';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/common/libs/ui/tooltip';
import StatusBadge from '@/common/components/molecules/StatusBadge';

const NavbarDesigner = () => {
  const { formSelected } = useFormStore();

  return (
    <nav className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex items-center gap-3">
          <FileText className="h-5 w-5" />
          <div className="min-w-0">
            <div className="mt-1 flex min-w-0 items-center gap-2">
              <h2 className="truncate text-lg font-semibold tracking-tight text-foreground">
                {formSelected?.name || 'Untitled form'}
              </h2>

              {formSelected?.description?.trim() && (
                <TooltipProvider delayDuration={150}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                        aria-label="Show form description"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="max-w-[320px] rounded-xl border border-border bg-popover text-popover-foreground shadow-md"
                    >
                      <p className="text-sm leading-6">
                        {formSelected.description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <StatusBadge status={formSelected?.status} size="sm" />
            </div>
            <p className="mt-1 truncate text-sm text-muted-foreground">
              {formSelected?.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm">
          <PreviewDialogBtn />

          <ActionGuard
            currentActions={formSelected?.status.allowedActions}
            allowedActions={[FORM_ACTION.Edit]}
          >
            <SaveFormBtn />
          </ActionGuard>

          {formSelected && (
            <ActionGuard
              currentActions={formSelected.status.allowedActions}
              allowedActions={[FORM_ACTION.Publish]}
            >
              <PublishFormBtn idForm={formSelected.id} />
            </ActionGuard>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarDesigner;
