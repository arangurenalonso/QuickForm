'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/common/libs/ui/alert-dialog';

type Props = {
  open: boolean;
  onStay: () => void;
  onSaveAndContinue: () => void;
  onDiscardAndContinue: () => void;
};

const UnsavedChangesDialog = ({
  open,
  onStay,
  onSaveAndContinue,
  onDiscardAndContinue,
}: Props) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Do you want to save them before leaving?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onStay}>Stay here</AlertDialogCancel>
          <button
            type="button"
            onClick={onDiscardAndContinue}
            className="qf-action-btn qf-action-btn-danger"
          >
            Discard and continue
          </button>
          <AlertDialogAction onClick={onSaveAndContinue}>
            Save and continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnsavedChangesDialog;
