'use client';

import { useEffect } from 'react';
import useAuthStore from '../hooks/useAuthStore';

export default function AuthSessionBootstrap() {
  const { bootstrapSession } = useAuthStore();

  useEffect(() => {
    void bootstrapSession();
  }, [bootstrapSession]);

  return null;
}
