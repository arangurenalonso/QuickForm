export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
};

// src/modules/auth/types/auth.dto.ts
export type ApiUser = { id: string; email: string; name: string | null };

export type LoginResponseBody = {
  ok: boolean;
  message?: string;
  user?: ApiUser;
  accessToken?: string; // si tu .NET lo manda en body
  refreshToken?: string; // si tu .NET lo manda en body
};

// Para /me
export type MeResponseBody = {
  ok: boolean;
  user: ApiUser | null;
};

export type RefreshResponse = {
  accessToken: string; // devuelto por /auth/refresh (refresh en cookie httpOnly)
};
