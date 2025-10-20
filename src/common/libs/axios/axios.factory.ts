import axios from 'axios';
import { attachInterceptors } from './interceptors';

export type createAxiosProps = {
  baseURL: string;
};

export const createAxios = ({ baseURL }: createAxiosProps) => {
  const instance = axios.create({ baseURL });
  attachInterceptors(instance);
  return instance;
};
