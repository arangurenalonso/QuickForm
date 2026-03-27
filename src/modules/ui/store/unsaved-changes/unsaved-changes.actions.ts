import type { UnsavedChangesHandlers } from './unsaved-changes.types';

export type UnsavedChangesActions = {
  setDirtyScope: (scope: string, value: boolean) => void;
  resetScope: (scope: string) => void;

  registerHandlers: (scope: string, handlers: UnsavedChangesHandlers) => void;
  unregisterHandlers: (scope: string) => void;

  requestNavigation: (scope: string, nextUrl: string) => boolean;
  cancelNavigation: () => void;

  runStay: () => void;
  runDiscardAndContinue: () => string | null;
  runSaveAndContinue: () => Promise<string | null>;

  resetAllUnsavedChanges: () => void;
};
