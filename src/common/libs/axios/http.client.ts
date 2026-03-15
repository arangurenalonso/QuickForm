import { createAxios } from './axios.factory';

export const api = {
  auth: createAxios({
    baseURL: '/api/auth',
  }),
  backend: createAxios({
    baseURL: '/api/backend',
  }),
};
