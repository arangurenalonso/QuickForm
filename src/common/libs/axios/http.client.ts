import { createAxios } from './axios.factory';

export const api = {
  auth: createAxios({
    baseURL: '/api/auth',
    logoutOn401: false,
  }),
  protected: createAxios({
    baseURL: '/api/protected',
    logoutOn401: true,
  }),
};
