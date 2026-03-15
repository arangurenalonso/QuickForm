export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
};

export type BackendSessionResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type FrontSessionResponse = {
  isAuthenticated: boolean;
  user: AuthUser | null;
};

export function isBackendSessionResponse(
  value: unknown
): value is BackendSessionResponse {
  if (typeof value !== 'object' || value === null) return false;

  const v = value as Record<string, unknown>;

  return (
    typeof v.accessToken === 'string' &&
    typeof v.refreshToken === 'string' &&
    typeof v.user === 'object' &&
    v.user !== null &&
    typeof (v.user as Record<string, unknown>).id === 'string' &&
    typeof (v.user as Record<string, unknown>).email === 'string'
  );
}
