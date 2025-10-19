import { AuthModel } from './auth.model';

export const createAuthInitialState = (): Pick<
  AuthModel,
  'isAuthenticated' | 'user' | 'token'
> => ({
  isAuthenticated: false,
  user: null,
  token: null,
});
