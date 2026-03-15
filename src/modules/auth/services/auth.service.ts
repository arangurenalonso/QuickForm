import { api } from '@/common/libs/axios/http.client';
import { mapAxiosToAuthError } from '@/common/libs/axios/error-map';
import { err, ok, Result } from '@/common/types/result';
import {
  EmailConfirmationRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResendVerifyEmailRequest,
  ResetPasswordRequest,
  SessionResponse,
} from '../types/auth.types';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { ResultResponse } from '@/common/types/resultResponse';

export const authService = {
  async login(
    payload: LoginRequest
  ): Promise<Result<SessionResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<SessionResponse>('/login', payload);
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async me(): Promise<Result<SessionResponse, AuthError>> {
    try {
      const { data } = await api.auth.get<SessionResponse>('/me');
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async refresh(): Promise<Result<SessionResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<SessionResponse>('/refresh');
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async logout(): Promise<Result<{ ok: true }, AuthError>> {
    try {
      const { data } = await api.auth.post<{ ok: true }>('/logout');
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async register(
    payload: RegisterRequest
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<ResultResponse>(
        '/register',
        payload
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async resendEmailConfirmation(
    payload: ResendVerifyEmailRequest
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<ResultResponse>(
        '/resend-email-confirmation',
        payload
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async emailConfirmation(
    payload: EmailConfirmationRequest
  ): Promise<Result<SessionResponse | ResultResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<SessionResponse | ResultResponse>(
        '/email-confirmation',
        payload
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async forgotPassword(
    payload: ForgotPasswordRequest
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<ResultResponse>(
        '/forgot-password',
        payload
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async resetPassword(
    payload: ResetPasswordRequest
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<ResultResponse>(
        '/reset-password',
        payload
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },
};
