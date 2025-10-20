// src/common/http/error-map.ts
import axios, { isAxiosError } from 'axios';
import { isBackendErrorPayload, BackendErrorItem } from './error.result';

export type AuthErrorKind =
  | 'InvalidCredentials'
  | 'Unauthorized'
  | 'NotFound'
  | 'Validation'
  | 'RateLimited'
  | 'Network'
  | 'Timeout'
  | 'Canceled'
  | 'Server'
  | 'BadRequest'
  | 'Unknown';

export type AuthError = {
  kind: AuthErrorKind;
  message: string;
  details?: BackendErrorItem[];
};

// === Helpers ===
function isCanceled(e: unknown): boolean {
  return axios.isCancel(e) || (isAxiosError(e) && e.code === 'ERR_CANCELED');
}
function isTimeout(e: unknown): boolean {
  return isAxiosError(e) && e.code === 'ECONNABORTED';
}

// function mapFieldErrors(
//   p?: BackendErrorPayload
// ): Record<string, string> | undefined {
//   if (!p?.errors?.length) return undefined;
//   const map = new Map<string, string[]>();
//   for (const err of p.errors) {
//     const key = err.propertyName || '_';
//     const arr = map.get(key) ?? [];
//     arr.push(err.description);
//     map.set(key, arr);
//   }
//   const out: Record<string, string> = {};
//   for (const [k, v] of map) out[k] = v.join('\n');
//   return out;
// }

export function mapAxiosToAuthError(e: unknown): AuthError {
  if (!isAxiosError(e)) {
    return { kind: 'Unknown', message: 'Unexpected error' };
  }

  if (isCanceled(e)) {
    return { kind: 'Canceled', message: 'Request was canceled' };
  }

  if (isTimeout(e)) {
    return { kind: 'Timeout', message: 'Request timeout' };
  }

  if (!e.response) {
    return { kind: 'Network', message: e.message };
  }

  const status = e.response.status;
  const data = e.response.data;
  const payload = isBackendErrorPayload(data) ? data : undefined;

  const message = payload?.message || 'Unknown error';

  const details = payload ? payload.errors : undefined;

  switch (status) {
    case 400:
      return {
        kind: 'BadRequest',
        message,
        details,
      };

    case 401:
      return {
        kind: 'InvalidCredentials',
        message: message ?? 'Unauthorized',
        details,
      };

    case 403:
      return { kind: 'Unauthorized', message: message ?? 'Forbidden', details };

    case 404:
      return { kind: 'NotFound', message: message ?? 'Not found', details };

    case 409:
      return { kind: 'BadRequest', message: message ?? 'Conflict', details };

    case 422:
      return {
        kind: 'Validation',
        message: message ?? 'Validation error',
        details,
      };

    case 429:
      return {
        kind: 'RateLimited',
        message: message ?? 'Too many requests',
        details,
      };

    default:
      if (status >= 500) {
        return { kind: 'Server', message: message ?? 'Server error', details };
      }
      return { kind: 'Unknown', message, details };
  }
}
