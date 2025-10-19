import { AuthUser } from '../types/auth.types';

export type AuthActions = {
  signIn: (payload: { user: AuthUser; token: string }) => void;
  signOut: () => void;
};
