// src/store/useRehydrate.ts
'use client';
import { useEffect, useRef, useState } from 'react';
import { useBoundStore } from '.';

export function useRehydratePersistedStore() {
  const [hydrated, setHydrated] = useState(
    useBoundStore.persist?.hasHydrated?.() ?? false
  );
  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return; // <-- evita doble efecto en dev
    didInitRef.current = true;

    const unsubFinish = useBoundStore.persist?.onFinishHydration?.(() => {
      setHydrated(true);
    });

    if (!useBoundStore.persist?.hasHydrated?.()) {
      useBoundStore.persist?.rehydrate?.();
    } else {
      setHydrated(true);
    }

    return () => {
      unsubFinish?.();
    };
  }, []);

  return hydrated;
}
