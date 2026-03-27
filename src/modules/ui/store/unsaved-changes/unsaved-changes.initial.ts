import type { UnsavedChangesModel } from './unsaved-changes.model';

export const createUnsavedChangesInitialState = (): UnsavedChangesModel => ({
  dirtyScopes: {},
  handlersByScope: {},
  isDialogOpen: false,
  pendingNavigationUrl: null,
  pendingScope: null,
});
