import { ENV } from '../env';
import { createAxios } from './axios.factory';

export const api = {
  auth: createAxios({
    baseURL: ENV.authApi ?? '',
  }),
};
