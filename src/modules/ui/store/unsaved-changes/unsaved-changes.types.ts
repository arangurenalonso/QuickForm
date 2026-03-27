export type UnsavedChangesHandlers = {
  onSaveAndContinue?: () => Promise<boolean> | boolean;
  onDiscardAndContinue?: () => void;
  onStay?: () => void;
};
