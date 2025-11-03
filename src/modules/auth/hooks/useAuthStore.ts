'use client';

import { useCallback, useMemo, useState } from 'react';
import { useBoundStore } from '@/store';
import { authService } from '../services/auth.service';
import { isOk } from '@/common/types/result';
import { ResultResponse } from '@/common/types/resultResponse';
import { AuthError } from '@/common/libs/axios/type/error.type';

export default function useAuthStore() {
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);
  const user = useBoundStore((state) => state.user);
  const token = useBoundStore((state) => state.token);
  const setAccessToken = useBoundStore((state) => state.setAccessToken);

  const [error, setError] = useState<AuthError | null>(null);

  const signInProcess = useCallback(
    async (email: string, password: string) => {
      clearError();
      const res = await authService.login({ email, password });
      if (!isOk(res)) {
        setError(res.error);
        return;
      }
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
      clearError();
      const res = await authService.register({
        email,
        password,
        confirmPassword,
      });
      if (!isOk(res)) {
        setError(res.error);
        return;
      }
      return res.value;
    },
    []
  );
  const resendVerificationEmailProcess = useCallback(
    async (email: string): Promise<ResultResponse | undefined> => {
      clearError();
      const res = await authService.resendEmailConfirmation({
        email,
      });
      if (!isOk(res)) {
        setError(res.error);
        return;
      }
      return res.value;
    },
    []
  );

  const emailConfirmationProcess = useCallback(
    async (email: string, verificationCode: string) => {
      clearError();
      const res = await authService.emailConfirmation({
        email,
        verificationCode,
      });
      if (!isOk(res)) {
        setError(res.error);
        return;
      }
      setAccessToken(res.value);
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

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
      error,
      signInProcess,
      signUpProcess,
      clearError,
      resendVerificationEmailProcess,
      emailConfirmationProcess,
      // refreshProcess,
      // signOutProcess,
      // meProcess,
    }),
    [
      isAuthenticated,
      user,
      token,
      error,
      signInProcess,
      signUpProcess,
      resendVerificationEmailProcess,
      clearError,
      // refreshProcess,
      // signOutProcess,
      // meProcess,
    ]
  );
}
