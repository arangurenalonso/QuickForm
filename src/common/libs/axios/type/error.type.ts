export type BackendErrorItem = {
  propertyName: string;
  description: string;
  redirectUrl?: string;
};

export type BackendErrorPayload = {
  message: string;
  errors: BackendErrorItem[];
};
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
