// import { authService } from '@/modules/auth/services/auth.service';
import { useBoundStore } from '@/store';
import type { AxiosError, AxiosInstance } from 'axios';

// const _isRefreshing = false;
// let _queue: Array<() => void> = [];
// const flush = () => {
//   _queue.forEach((r) => r());
//   _queue = [];
// };

export function attachInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      const { token } = useBoundStore.getState();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      // const status = error.response?.status;
      // const original: any = error.config ?? {};
      // if (status === 401 && !original._retry) {
      //   original._retry = true;

      //   if (_isRefreshing) {
      //     await new Promise<void>((resolve) => _queue.push(resolve));
      //     return instance(original);
      //   }

      //   _isRefreshing = true;
      //   try {
      //     const { accessToken  } = await authService.refresh(); // cookie httpOnly viaja sola
      //     useBoundStore.getState().setAccessToken(accessToken);
      //     flush ();
      //     return instance(original);
      //   } catch (e) {
      //     useBoundStore.getState().signOut();
      //     throw e;
      //   } finally {
      //     _isRefreshing = false;
      //   }
      // }
      return Promise.reject(error);
    }
  );
}
