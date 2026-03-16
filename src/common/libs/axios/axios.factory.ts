import axios from 'axios';
import { attachInterceptors } from './interceptors';

export type CreateAxiosProps = {
  baseURL: string;
  logoutOn401?: boolean;
};

export const createAxios = ({
  baseURL,
  logoutOn401 = false,
}: CreateAxiosProps) => {
  const instance = axios.create({ baseURL });
  attachInterceptors(instance, { logoutOn401 });
  return instance;
};
