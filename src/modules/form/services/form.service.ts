import { api } from '@/common/libs/axios/http.client';
import { mapAxiosToAuthError } from '@/common/libs/axios/error-map';
import { err } from '@/common/types/result';
import { ok } from '@/common/types/result';
import { Result } from '@/common/types/result';
import { ResultResponse } from '@/common/types/resultResponse';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { CreateFormRequest, FormType } from '../types/form.types';
import { SectionType } from '../components/form-designer/context/designer-context.type';
import { generateFieldFromExisting } from '../components/controlledField/generateFieldElement';

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

  async getForms(): Promise<Result<FormType[], AuthError>> {
    try {
      const { data } = await api.auth.get<FormType[]>('/me/forms');
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async getFormById(idForm: string): Promise<Result<FormType, AuthError>> {
    try {
      const { data } = await api.auth.get<FormType>(`/me/form/${idForm}`);
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },
  async saveFormStructure(
    payload: SectionType[],
    idForm: string
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const { data } = await api.auth.post<ResultResponse>(
        `/form/${idForm}/structure`,
        payload
      );
      return ok(data); // data = token string
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async getFormStructureByIdForm(
    idForm: string
  ): Promise<Result<SectionType[], AuthError>> {
    try {
      const { data } = await api.auth.get<SectionType[]>(
        `/form/${idForm}/structure`
      );

      const result = data.map((section) => {
        const sectionDTO: SectionType = {
          id: section.id,
          title: section.title,
          description: section.description,
          fields: section.fields
            .map((field) => {
              return generateFieldFromExisting(field);
            })
            .filter((field) => field !== null),
        };
        return sectionDTO;
      });

      return ok(result);
    } catch (e) {
      console.log('Error fetching form structure:', e);
      return err(mapAxiosToAuthError(e));
    }
  },
};
