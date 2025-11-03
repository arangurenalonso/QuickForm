import { BackendErrorItem, BackendErrorPayload } from './error.type';
import axios, { isAxiosError } from 'axios';

const isCanceled = (e: unknown): boolean => {
  return axios.isCancel(e) || (isAxiosError(e) && e.code === 'ERR_CANCELED');
};
const isTimeout = (e: unknown): boolean => {
  return isAxiosError(e) && e.code === 'ECONNABORTED';
};

const isBackendErrorItem = (x: unknown): x is BackendErrorItem => {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.propertyName === 'string' && typeof o.description === 'string'
  );
};

const isBackendQuickFormErrorPayload = (
  x: unknown
): x is BackendErrorPayload => {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;

  if (typeof o.message !== 'string') return false;

  if (!Array.isArray(o.errors)) return false;
  if (!o.errors.every(isBackendErrorItem)) return false;
  return true;
};
export {
  isCanceled,
  isTimeout,
  isBackendErrorItem,
  isBackendQuickFormErrorPayload,
};
