import { api } from '@/common/libs/axios/http.client';
import { AuthError, mapAxiosToAuthError } from '@/common/libs/axios/error-map';
import { err } from '@/common/types/result';
import { ok } from '@/common/types/result';
import { Result } from '@/common/types/result';
import { LoginRequest, RegisterRequest } from '../types/auth.types';
import { ResultResponse } from '@/common/types/resultResponse';

export const authService = {
  async login(payload: LoginRequest): Promise<Result<string, AuthError>> {
    try {
      const { data } = await api.auth.post<string>('/auth/login', payload);
      return ok(data); // data = token string
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async register(
    payload: RegisterRequest
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<ResultResponse>(
        '/auth/register',
        payload
      );
      return ok(data); // data = token string
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  // async refresh(): Promise<RefreshResponse> {
  //   const { data } = await api.auth.post<RefreshResponse>('/auth/refresh');
  //   return data;
  // },
  // async me(): Promise<AuthUser> {
  //   const { data } = await api.auth.get<AuthUser>('/auth/me');
  //   return data;
  // },
  // async logout(): Promise<void> {
  //   await api.auth.post('/auth/logout');
  // },
};
