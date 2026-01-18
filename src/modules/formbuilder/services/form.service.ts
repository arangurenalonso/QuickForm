import { api } from '@/common/libs/axios/http.client';
import { mapAxiosToAuthError } from '@/common/libs/axios/error-map';
import { err } from '@/common/types/result';
import { ok } from '@/common/types/result';
import { Result } from '@/common/types/result';
import { ResultResponse } from '@/common/types/resultResponse';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { CreateFormRequest, formType } from '../types/form.types';

export const formService = {
  async createForm(
    payload: CreateFormRequest
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<ResultResponse>(
        '/form/register',
        payload
      );
      return ok(data); // data = token string
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async getForms(): Promise<Result<formType[], AuthError>> {
    try {
      const { data } = await api.auth.get<formType[]>('/me/forms');
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },
};
