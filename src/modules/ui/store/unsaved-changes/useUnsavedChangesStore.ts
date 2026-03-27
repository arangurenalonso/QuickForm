'use client';

import { useBoundStore } from '@/store';
import { useCallback, useMemo } from 'react';
import type { UnsavedChangesHandlers } from './unsaved-changes.types';

export default function useUnsavedChangesStore(scope?: string) {
  const dirtyScopes = useBoundStore((state) => state.dirtyScopes);
  const isDialogOpen = useBoundStore((state) => state.isDialogOpen);
  const pendingNavigationUrl = useBoundStore(
    (state) => state.pendingNavigationUrl
  );
  const pendingScope = useBoundStore((state) => state.pendingScope);

  const setDirtyScope = useBoundStore((state) => state.setDirtyScope);
  const resetScopeBase = useBoundStore((state) => state.resetScope);
  const registerHandlersBase = useBoundStore((state) => state.registerHandlers);
  const unregisterHandlersBase = useBoundStore(
    (state) => state.unregisterHandlers
  );
  const requestNavigationBase = useBoundStore(
    (state) => state.requestNavigation
  );
  const cancelNavigation = useBoundStore((state) => state.cancelNavigation);
  const runStay = useBoundStore((state) => state.runStay);
  const runDiscardAndContinue = useBoundStore(
    (state) => state.runDiscardAndContinue
  );
  const runSaveAndContinue = useBoundStore((state) => state.runSaveAndContinue);

  const isDirty = scope ? !!dirtyScopes[scope] : false;
  const isCurrentScopePending = scope ? pendingScope === scope : false;

  const setDirty = useCallback(
    (value: boolean) => {
      if (!scope) return;
      setDirtyScope(scope, value);
    },
    [scope, setDirtyScope]
  );

  const resetScope = useCallback(() => {
    if (!scope) return;
    resetScopeBase(scope);
  }, [scope, resetScopeBase]);

  const registerHandlers = useCallback(
    (handlers: UnsavedChangesHandlers) => {
      if (!scope) return;
      registerHandlersBase(scope, handlers);
    },
    [scope, registerHandlersBase]
  );

  const unregisterHandlers = useCallback(() => {
    if (!scope) return;
    unregisterHandlersBase(scope);
  }, [scope, unregisterHandlersBase]);

  const requestNavigation = useCallback(
    (nextUrl: string) => {
      if (!scope) return true;
      return requestNavigationBase(scope, nextUrl);
    },
    [scope, requestNavigationBase]
  );

  return useMemo(
    () => ({
      isDirty,
      isDialogOpen,
      pendingNavigationUrl,
      pendingScope,
      isCurrentScopePending,
      setDirty,
      resetScope,
      registerHandlers,
      unregisterHandlers,
      requestNavigation,
      cancelNavigation,
      runStay,
      runDiscardAndContinue,
      runSaveAndContinue,
      dirtyScopes,
    }),
    [
      isDirty,
      isDialogOpen,
      pendingNavigationUrl,
      pendingScope,
      isCurrentScopePending,
      setDirty,
      resetScope,
      registerHandlers,
      unregisterHandlers,
      requestNavigation,
      cancelNavigation,
      runStay,
      runDiscardAndContinue,
      runSaveAndContinue,
      dirtyScopes,
    ]
  );
}
