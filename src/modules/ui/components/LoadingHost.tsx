'use client';

import { useBoundStore } from '@/store';

import { useEffect } from 'react';
import LoadingScreen from '@/common/components/LoadingScreen';

const LoadingHost = () => {
  const pendingCount = useBoundStore((state) => state.pendingCount);
  const message = useBoundStore((s) => s.message);

  const isOpen = pendingCount > 0;

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return isOpen ? (
    <LoadingScreen message={message} pendingCount={pendingCount} />
  ) : null;
};

export default LoadingHost;
