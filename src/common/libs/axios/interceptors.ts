import { useBoundStore } from '@/store';
import { AxiosError, AxiosInstance } from 'axios';
import { LOGIN_PATH } from '../auth/auth.constants';

function redirectToLogin() {
  if (typeof window !== 'undefined') {
    window.location.href = LOGIN_PATH;
  }
}

function clearClientAuthState() {
  const { clearSession } = useBoundStore.getState();
  clearSession();
  // Example with Zustand/local storage/etc.
  // useAuthStore.getState().logout();
  // localStorage.removeItem('whatever');
}
type AttachInterceptorsOptions = {
  logoutOn401?: boolean;
};

export function attachInterceptors(
  instance: AxiosInstance,
  options: AttachInterceptorsOptions = {}
) {
  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 401 && options.logoutOn401) {
        clearClientAuthState();
        redirectToLogin();
      }

      return Promise.reject(error);
    }
  );
}
