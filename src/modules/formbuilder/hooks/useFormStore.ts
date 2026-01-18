'use client';

import { useCallback, useMemo, useState } from 'react';
// import { useBoundStore } from '@/store';
import { isOk } from '@/common/types/result';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { formService } from '../services/form.service';

export default function useFormStore() {
  // const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

  const [error, setError] = useState<AuthError | null>(null);

  const createFormProcess = useCallback(
    async (name: string, description?: string) => {
      clearError();
      const res = await formService.createForm({ name, description });
      if (!isOk(res)) {
        setError(res.error);
        return;
      }

      // signIn({ user: res.user, token: res.accessToken });
      // router.replace('/');
      return res.value;
    },
    []
  );
  const getFormaProcess = useCallback(async () => {
    clearError();
    const res = await formService.getForms();
    if (!isOk(res)) {
      setError(res.error);
      return;
    }
    return res.value;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return useMemo(
    () => ({
      error,
      createFormProcess,
      getFormaProcess,
      clearError,
    }),
    [error, createFormProcess, clearError]
  );
}
