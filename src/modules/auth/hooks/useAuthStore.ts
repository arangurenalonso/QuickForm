'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBoundStore } from '@/store';
import { authService } from '../services/auth.service';
import { isOk } from '@/common/types/result';
import { ResultResponse } from '@/common/types/resultResponse';
// import { useRouter } from 'next/navigation';

export default function useAuthStore() {
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);
  const user = useBoundStore((state) => state.user);
  const token = useBoundStore((state) => state.token);
  const setAccessToken = useBoundStore((state) => state.setAccessToken);
  // const router = useRouter();

  // const { isAuthenticated, user, token, setAccessToken } =
  //   useBoundStore.getState();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signInProcess = useCallback(
    async (email: string, password: string) => {
      restoreState();
      const res = await authService.login({ email, password });
      if (!isOk(res)) {
        console.log('Login error:', res?.error);
        setErrorMessage(res.error.message || 'Login failed');
        return;
      }
      restoreState();
      setAccessToken(res.value);
      // signIn({ user: res.user, token: res.accessToken });
      // router.replace('/');
      return;
    },
    [setAccessToken]
  );

  const signUpProcess = useCallback(
    async (
      email: string,
      password: string,
      confirmPassword: string
    ): Promise<ResultResponse | undefined> => {
      restoreState();
      const res = await authService.register({
        email,
        password,
        confirmPassword,
      });
      if (!isOk(res)) {
        console.log('Register error:', res?.error);
        setErrorMessage(res.error.message || 'Register failed');
        return;
      }
      restoreState();
      return res.value;
    },
    []
  );

  const restoreState = () => {
    setErrorMessage(null);
  };

  // const refreshProcess = useCallback(async () => {
  //   const res = await authClient.refreshAction();
  //   if (res.ok && res.accessToken) {
  //     // actualiza access token en zustand
  //     useBoundStore.setState({ token: res.accessToken });
  //     return true;
  //   }
  //   return false;
  // }, []);

  // const signOutProcess = useCallback(async () => {
  //   await authClient.signOutAction();
  //   signOut();
  // }, [signOut]);

  useEffect(() => {
    console.log('Token changed:', token);
    // meProcess();
  }, [token]);

  // const meProcess = useCallback(async () => {
  //   // if (!token) return { ok: false, user: null };
  //   // const res = await authClient.meAction(token);
  //   // return res;
  // }, [token]);

  return useMemo(
    () => ({
      isAuthenticated,
      user,
      token,
      errorMessage,
      signInProcess,
      signUpProcess,
      // refreshProcess,
      // signOutProcess,
      // meProcess,
    }),
    [
      isAuthenticated,
      user,
      token,
      errorMessage,
      signInProcess,
      signUpProcess,
      // refreshProcess,
      // signOutProcess,
      // meProcess,
    ]
  );
}
