// src/common/http/error-map.ts
import { isAxiosError } from 'axios';

// src/modules/auth/types/auth.errors.ts
export type AuthErrorKind =
  | 'InvalidCredentials'
  | 'Unauthorized'
  | 'Network'
  | 'Server'
  | 'Timeout'
  | 'BadRequest'
  | 'Unknown';

export type AuthError = {
  kind: AuthErrorKind;
  message?: string;
  status?: number;
  details?: unknown;
};

export function mapAxiosToAuthError(e: unknown): AuthError {
  if (!isAxiosError(e)) {
    return { kind: 'Unknown', message: 'Unexpected error' };
  } // Sin respuesta del server (caída de red / CORS / DNS)

  if (!e.response) {
    if (e.code === 'ECONNABORTED')
      return { kind: 'Timeout', message: 'Request timeout' };
    return { kind: 'Network', message: e.message };
  }

  const { status, data } = e.response;
  const message = (data as any)?.message ?? e.message;

  if (status === 400)
    return { kind: 'BadRequest', message, status, details: data };
  if (status === 401) {
    // Puedes distinguir 401 de credenciales vs token expirado si tu API lo indica
    return {
      kind: 'InvalidCredentials',
      message: message ?? 'Invalid credentials',
      status,
      details: data,
    };
  }
  if (status >= 500)
    return {
      kind: 'Server',
      message: message ?? 'Server error',
      status,
      details: data,
    };

  return { kind: 'Unknown', message, status, details: data };
}
