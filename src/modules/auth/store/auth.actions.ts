import { AuthUser } from '../types/auth.types';

export type AuthActions = {
  setSession: (payload: { user: AuthUser }) => void;
  clearSession: () => void;
};
