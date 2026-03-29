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

  const hasViewSubmissions = currentActions.includes(
    FORM_ACTION.ViewSubmissions
  );

  return (
    <div className="flex items-center justify-end gap-1">
      {hasEdit && (
        <Button
          type="button"
          size="icon"
          className="qf-action-btn qf-action-btn-warning"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}

      {!hasEdit && (
        <Button
          type="button"
          size="icon"
          className="qf-action-btn qf-action-btn-info"
          onClick={(e) => {
            e.stopPropagation();
            onView?.();
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}

      {hasViewSubmissions && (
        <Button
          type="button"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onViewSubmissions?.();
          }}
          className="qf-action-btn qf-action-btn-neutral"
        >
          <FileText className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormRowActions;
