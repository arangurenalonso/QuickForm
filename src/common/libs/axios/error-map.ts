import { isAxiosError } from 'axios';
import {
  isBackendQuickFormErrorPayload,
  isCanceled,
  isTimeout,
} from './type/error.helper';
import { AuthError } from './type/error.type';

function defaultMessageForStatus(status: number): string {
  switch (status) {
    case 400:
      return 'We couldn’t process your request. Please review the data and try again.';
    case 401:
      return 'Your credentials are not valid, or your session expired. Please sign in again.';
    case 403:
      return 'You don’t have permission to perform this action.';
    case 404:
      return 'We couldn’t find what you’re looking for. The resource may have been removed or the link may be incorrect.';
    case 408:
      return 'The server took too long to respond. Please try again.';
    case 409:
      return 'This request conflicts with the current state. It may already exist or was changed by someone else.';
    case 413:
      return 'The request is too large. Please reduce the size and try again.';
    case 415:
      return 'Unsupported file or content type. Please check what you’re sending and try again.';
    case 422:
      return 'Some fields are invalid. Please review the highlighted inputs and try again.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    default:
      if (status >= 500) {
        return 'We’re having trouble on our side. Please try again later.';
      }
      return `Request failed (HTTP ${status}). Please try again.`;
  }
}

export function mapAxiosToAuthError(e: unknown): AuthError {
  console.error('Mapping error:', e);
  if (!isAxiosError(e)) {
    return { kind: 'Unknown', message: 'Unexpected error. Please try again.' };
  }

  if (isCanceled(e)) {
    return { kind: 'Canceled', message: 'Request was canceled.' };
  }

  if (isTimeout(e)) {
    return {
      kind: 'Timeout',
      message: 'The request took too long. Please try again.',
    };
  }

  // No response usually means: offline, DNS, CORS blocked, server down, VPN, etc.
  if (!e.response) {
    return {
      kind: 'Network',
      message:
        'We couldn’t reach the server. Check your internet/VPN connection and try again.',
    };
  }

  const status = e.response.status;
  const data = e.response.data;
  const payload = isBackendQuickFormErrorPayload(data) ? data : undefined;

  const details = payload ? payload.errors : undefined;
  const message = payload?.message ?? defaultMessageForStatus(status);

  switch (status) {
    case 400:
      return {
        kind: 'BadRequest',
        message: message ?? 'Bad request',
        details,
      };

    case 401:
      return {
        kind: 'InvalidCredentials',
        message,
        details,
      };

    case 403:
      return { kind: 'Unauthorized', message, details };

    case 404:
      return { kind: 'NotFound', message, details };
    case 408:
      return { kind: 'Timeout', message, details };
    case 409:
      return { kind: 'BadRequest', message, details };
    case 413:
      return { kind: 'PayloadTooLarge', message, details };
    case 415:
      return { kind: 'UnsupportedMediaType', message, details };

    case 422:
      return {
        kind: 'Validation',
        message,
        details,
      };

    case 429:
      return {
        kind: 'RateLimited',
        message,
        details,
      };

    default:
      if (status >= 500) {
        return { kind: 'Server', message, details };
      }
      return { kind: 'Unknown', message, details };
  }
}
