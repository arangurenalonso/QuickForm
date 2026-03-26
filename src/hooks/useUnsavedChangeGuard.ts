import { useCallback, useMemo, useState } from 'react';

type UseUnsavedChangesGuardProps = {
  isDirty: boolean;
  onSave?: () => Promise<boolean>;
};

const useUnsavedChangesGuard = ({
  isDirty,
  onSave,
}: UseUnsavedChangesGuardProps) => {
  const [open, setOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);

  const requestAction = useCallback(
    (action: () => void) => {
      if (!isDirty) {
        action();
        return;
      }

      setPendingAction(() => action);
      setOpen(true);
    },
    [isDirty]
  );

  const handleCancel = useCallback(() => {
    setOpen(false);
    setPendingAction(null);
  }, []);

  const handleConfirmSave = useCallback(async () => {
    if (!onSave) return;

    const success = await onSave();
    if (!success) return;

    setOpen(false);

    const action = pendingAction;
    setPendingAction(null);
    action?.();
  }, [onSave, pendingAction]);

  const handleConfirmDiscard = useCallback(() => {
    setOpen(false);

    const action = pendingAction;
    setPendingAction(null);
    action?.();
  }, [pendingAction]);

  return useMemo(
    () => ({
      open,
      requestAction,
      handleCancel,
      handleConfirmSave,
      handleConfirmDiscard,
    }),
    [open, requestAction, handleCancel, handleConfirmSave, handleConfirmDiscard]
  );
};

export default useUnsavedChangesGuard;
