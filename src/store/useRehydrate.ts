// src/store/useRehydrate.ts
'use client';

import { useEffect, useState } from 'react';
import { useBoundStore } from '.';

export function useRehydratePersistedStore() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // 1) Si ya está hidratado (por ejemplo, navegaciones siguientes)
    const already = useBoundStore.persist?.hasHydrated?.() ?? false;
    if (already) {
      setHydrated(true);
    }

    // 2) Suscribirse al final de la hidratación
    const unsubFinish = useBoundStore.persist?.onFinishHydration?.(() => {
      setHydrated(true);
    });

    // (Opcional) si quieres marcar "loading" durante la hidratación:
    // const unsubStart = useBoundStore.persist?.onHydrate?.(() => setHydrated(false));

    // 3) Si no estaba hidratado y usas skipHydration, dispara rehydrate()
    if (!already) {
      useBoundStore.persist?.rehydrate?.();
    }

    return () => {
      // Limpieza de listeners
      unsubFinish?.();
      // unsubStart?.();
    };
  }, []);

  return hydrated;
}
