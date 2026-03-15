import { AuthModel } from './auth.model';

export const createAuthInitialState = (): AuthModel => ({
  isAuthenticated: false,
  user: null,
});
