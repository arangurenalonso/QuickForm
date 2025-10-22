// src/components/hydration-gate.tsx
'use client';

import type { ReactNode } from 'react';
import { useRehydratePersistedStore } from '@/store/useRehydrate';
import LoadingScreen from './LoadingScreen';

type HydrationGateProps = {
  children: ReactNode;
};
export default function HydrationGate({ children }: HydrationGateProps) {
  const hydrated = useRehydratePersistedStore();

  return (
    <>
      {children}
      {!hydrated && <LoadingScreen />}{' '}
    </>
  );
}
