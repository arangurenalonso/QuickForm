import { AuthUser } from '../types/auth.types';

export interface AuthModel {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
}
