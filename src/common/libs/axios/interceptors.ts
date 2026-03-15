import { AxiosError, AxiosInstance } from 'axios';

export function attachInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}
