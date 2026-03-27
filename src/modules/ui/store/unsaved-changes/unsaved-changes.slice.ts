'use client';

import type { ImmerStateCreator } from '@/store/type';
import type { UnsavedChangesActions } from './unsaved-changes.actions';
import { createUnsavedChangesInitialState } from './unsaved-changes.initial';
import type { UnsavedChangesModel } from './unsaved-changes.model';

export type UnsavedChangesSlice = UnsavedChangesModel & UnsavedChangesActions;

export const createUnsavedChangesSlice: ImmerStateCreator<
  UnsavedChangesSlice
> = (set, get) => ({
  ...createUnsavedChangesInitialState(),

  setDirtyScope: (scope, value) => {
    set((state) => {
      if (value) {
        state.dirtyScopes[scope] = true;
        return;
      }

      delete state.dirtyScopes[scope];
    });
  },

  resetScope: (scope) => {
    set((state) => {
      delete state.dirtyScopes[scope];
      delete state.handlersByScope[scope];

      if (state.pendingScope === scope) {
        state.isDialogOpen = false;
        state.pendingNavigationUrl = null;
        state.pendingScope = null;
      }
    });
  },

  registerHandlers: (scope, handlers) => {
    set((state) => {
      state.handlersByScope[scope] = handlers;
    });
  },

  unregisterHandlers: (scope) => {
    set((state) => {
      delete state.handlersByScope[scope];
    });
  },

  requestNavigation: (scope, nextUrl) => {
    const isDirty = !!get().dirtyScopes[scope];

    if (!isDirty) {
      return true;
    }

    set((state) => {
      state.isDialogOpen = true;
      state.pendingNavigationUrl = nextUrl;
      state.pendingScope = scope;
    });

    return false;
  },

  cancelNavigation: () => {
    set((state) => {
      state.isDialogOpen = false;
      state.pendingNavigationUrl = null;
      state.pendingScope = null;
    });
  },

  runStay: () => {
    const { pendingScope, handlersByScope } = get();

    if (pendingScope) {
      handlersByScope[pendingScope]?.onStay?.();
    }

    set((state) => {
      state.isDialogOpen = false;
      state.pendingNavigationUrl = null;
      state.pendingScope = null;
    });
  },

  runDiscardAndContinue: () => {
    const { pendingScope, pendingNavigationUrl, handlersByScope } = get();

    if (pendingScope) {
      handlersByScope[pendingScope]?.onDiscardAndContinue?.();
      set((state) => {
        delete state.dirtyScopes[pendingScope];
      });
    }

    set((state) => {
      state.isDialogOpen = false;
      state.pendingNavigationUrl = null;
      state.pendingScope = null;
    });

    return pendingNavigationUrl;
  },

  runSaveAndContinue: async () => {
    const { pendingScope, pendingNavigationUrl, handlersByScope } = get();

    if (!pendingScope) return null;

    const saveHandler = handlersByScope[pendingScope]?.onSaveAndContinue;
    if (!saveHandler) return null;

    const success = await saveHandler();
    if (!success) return null;

    set((state) => {
      delete state.dirtyScopes[pendingScope];
      state.isDialogOpen = false;
      state.pendingNavigationUrl = null;
      state.pendingScope = null;
    });

    return pendingNavigationUrl;
  },

  resetAllUnsavedChanges: () => {
    set((state) => {
      state.dirtyScopes = {};
      state.handlersByScope = {};
      state.isDialogOpen = false;
      state.pendingNavigationUrl = null;
      state.pendingScope = null;
    });
  },
});
