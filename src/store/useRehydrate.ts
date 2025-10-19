'use client';

import { useEffect, useState } from 'react';
import { useBoundStore } from './index';

/** Fuerza la rehidratación de persist en el cliente */
export function useRehydratePersistedStore() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // @ts-expect-error - persist plugin type is not exposed
    useBoundStore.persist?.rehydrate?.().finally(() => setHydrated(true));
  }, []);

  return hydrated;
}
