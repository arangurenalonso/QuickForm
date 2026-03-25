'use client';

import { Eye, Pencil, FileText } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import { FORM_ACTION } from '@/modules/form/enum/form.enum';

type FormRowActionsProps = {
  currentActions?: FORM_ACTION[] | null | undefined;
  onEdit?: () => void;
  onView?: () => void;
  onViewSubmissions?: () => void;
};

const FormRowActions = ({
  currentActions,
  onEdit,
  onView,
  onViewSubmissions,
}: FormRowActionsProps) => {
  if (!currentActions?.length) return null;

  const hasEdit = currentActions.includes(FORM_ACTION.Edit);

  const hasView = currentActions.some(
    (action) =>
      action !== FORM_ACTION.Edit && action !== FORM_ACTION.ViewSubmissions
  );

  const hasViewSubmissions = currentActions.includes(
    FORM_ACTION.ViewSubmissions
  );

  return (
    <div className="flex items-center justify-end gap-1">
      {hasEdit && (
        <Button
          type="button"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="qf-action-btn qf-action-btn-warning h-8 w-8 rounded-md"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}

      {hasView && (
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onView?.();
          }}
          className="qf-action-btn h-8 w-8 rounded-md border-border bg-background text-foreground hover:bg-muted"
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}

      {hasViewSubmissions && (
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onViewSubmissions?.();
          }}
          className="qf-action-btn h-8 w-8 rounded-md border-border bg-background text-foreground hover:bg-muted"
        >
          <FileText className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormRowActions;
