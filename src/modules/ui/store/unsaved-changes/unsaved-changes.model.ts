import type { UnsavedChangesHandlers } from './unsaved-changes.types';

export interface UnsavedChangesModel {
  dirtyScopes: Record<string, boolean>;
  handlersByScope: Record<string, UnsavedChangesHandlers | undefined>;
  isDialogOpen: boolean;
  pendingNavigationUrl: string | null;
  pendingScope: string | null;
}
