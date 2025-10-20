// src/modules/auth/hooks/useAuthStore.ts
'use client';

import { useCallback, useMemo, useState } from 'react';
import { useBoundStore } from '@/store';
import { authClient } from '../services/auth.service';

export default function useAuthStore() {
  const signIn = useBoundStore((s) => s.signIn);
  const signOut = useBoundStore((s) => s.signOut);

  const isAuthenticated = useBoundStore((s) => s.isAuthenticated);
  const user = useBoundStore((s) => s.user);
  const token = useBoundStore((s) => s.token);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signInProcess = useCallback(
    async (email: string, password: string) => {
      setErrorMessage(null);
      const res = await authClient.signInAction(email, password);
      if (!res.ok || !res.accessToken || !res.user) {
        setErrorMessage(res?.message ?? 'Invalid credentials');
        return false;
      }
      signIn({ user: res.user, token: res.accessToken });
      return true;
    },
    [signIn]
  );

  const refreshProcess = useCallback(async () => {
    const res = await authClient.refreshAction();
    if (res.ok && res.accessToken) {
      // actualiza access token en zustand
      useBoundStore.setState({ token: res.accessToken });
      return true;
    }
    return false;
  }, []);

  const signOutProcess = useCallback(async () => {
    await authClient.signOutAction();
    signOut();
  }, [signOut]);

  const meProcess = useCallback(async () => {
    if (!token) return { ok: false, user: null };
    const res = await authClient.meAction(token);
    return res;
  }, [token]);

  return useMemo(
    () => ({
      isAuthenticated,
      user,
      token,
      errorMessage,
      signInProcess,
      refreshProcess,
      signOutProcess,
      meProcess,
    }),
    [
      isAuthenticated,
      user,
      token,
      errorMessage,
      signInProcess,
      refreshProcess,
      signOutProcess,
      meProcess,
    ]
  );
}
