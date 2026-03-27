'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/common/libs/ui/alert-dialog';
import useUnsavedChangesStore from '../store/unsaved-changes/useUnsavedChangesStore';
import { Save, Trash2, X } from 'lucide-react';

const UnsavedChangesDialog = () => {
  const router = useRouter();

  const { isDialogOpen, runStay, runDiscardAndContinue, runSaveAndContinue } =
    useUnsavedChangesStore();

  const handleStay = useCallback(() => {
    runStay();
  }, [runStay]);

  const handleDiscardAndContinue = useCallback(() => {
    const nextUrl = runDiscardAndContinue();

    if (nextUrl) {
      router.push(nextUrl);
    }
  }, [runDiscardAndContinue, router]);

  const handleSaveAndContinue = useCallback(async () => {
    const nextUrl = await runSaveAndContinue();

    if (nextUrl) {
      router.push(nextUrl);
    }
  }, [runSaveAndContinue, router]);

  return (
    <AlertDialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleStay();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Do you want to save them before leaving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-end gap-2">
          <button
            onClick={handleStay}
            className="qf-action-btn qf-action-btn-danger h-10 w-10 rounded-md p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Stay here</span>
          </button>

          <button
            type="button"
            onClick={handleDiscardAndContinue}
            className="qf-action-btn qf-action-btn-danger h-10 w-10 rounded-md p-0"
            aria-label="Discard and continue"
            title="Discard and continue"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Discard and continue</span>
          </button>

          <AlertDialogAction
            className="h-10 w-10 p-0"
            onClick={(event) => {
              event.preventDefault();
              void handleSaveAndContinue();
            }}
          >
            <Save className="h-4 w-4" />
            <span className="sr-only">Save and continue</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnsavedChangesDialog;
