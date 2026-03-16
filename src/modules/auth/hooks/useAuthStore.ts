'use client';

import { useCallback, useMemo, useState } from 'react';
import { useBoundStore } from '@/store';
import { authService } from '../services/auth.service';
import { isOk } from '@/common/types/result';
import { ResultResponse } from '@/common/types/resultResponse';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { SessionResponse } from '../types/auth.types';

function isSessionResponse(value: unknown): value is SessionResponse {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.isAuthenticated === 'boolean' && 'user' in v;
}

export default function useAuthStore() {
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);
  const user = useBoundStore((state) => state.user);
  const setSession = useBoundStore((state) => state.setSession);
  const clearSessionState = useBoundStore((state) => state.clearSession);

  const [error, setError] = useState<AuthError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const bootstrapSession = useCallback(async () => {
    console.log('Bootstrapping auth session...');
    const res = await authService.me();

    if (!isOk(res)) {
      clearSessionState();
      return;
    }

    if (res.value.isAuthenticated && res.value.user) {
      setSession({ user: res.value.user });
      return;
    }

    clearSessionState();
  }, [setSession, clearSessionState]);

  const signInProcess = useCallback(
    async (email: string, password: string) => {
      clearError();

      const res = await authService.login({ email, password });
      if (!isOk(res)) {
        setError(res.error);
        return;
      }

      if (res.value.isAuthenticated && res.value.user) {
        setSession({ user: res.value.user });
      }

      return res.value;
    },
    [setSession, clearError]
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
    [clearError]
  );

  const resendVerificationEmailProcess = useCallback(
    async (email: string): Promise<ResultResponse | undefined> => {
      clearError();

      const res = await authService.resendEmailConfirmation({ email });

      if (!isOk(res)) {
        setError(res.error);
        return;
      }

      return res.value;
    },
    [clearError]
  );

  const forgotPasswordProcess = useCallback(
    async (email: string): Promise<ResultResponse | undefined> => {
      clearError();

      const res = await authService.forgotPassword({ email });

      if (!isOk(res)) {
        setError(res.error);
        return;
      }

      return res.value;
    },
    [clearError]
  );

  const resetPasswordProcess = useCallback(
    async (
      email: string,
      verificationCode: string,
      password: string,
      confirmPassword: string
    ): Promise<ResultResponse | undefined> => {
      clearError();

      const res = await authService.resetPassword({
        email,
        verificationCode,
        password,
        confirmPassword,
      });

      if (!isOk(res)) {
        setError(res.error);
        return;
      }

      return res.value;
    },
    [clearError]
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

      if (
        isSessionResponse(res.value) &&
        res.value.isAuthenticated &&
        res.value.user
      ) {
        setSession({ user: res.value.user });
      }

      return res.value;
    },
    [clearError, setSession]
  );

  const logoutProcess = useCallback(async () => {
    clearError();

    const res = await authService.logout();

    clearSessionState();

    if (!isOk(res)) {
      setError(res.error);
      return;
    }

    return res.value;
  }, [clearSessionState, clearError]);

  return useMemo(
    () => ({
      isAuthenticated,
      user,
      error,
      clearError,
      bootstrapSession,
      signInProcess,
      signUpProcess,
      resendVerificationEmailProcess,
      emailConfirmationProcess,
      forgotPasswordProcess,
      resetPasswordProcess,
      logoutProcess,
    }),
    [
      isAuthenticated,
      user,
      error,
      clearError,
      bootstrapSession,
      signInProcess,
      signUpProcess,
      resendVerificationEmailProcess,
      emailConfirmationProcess,
      forgotPasswordProcess,
      resetPasswordProcess,
      logoutProcess,
    ]
  );
}
