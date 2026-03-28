import { api } from '@/common/libs/axios/http.client';
import { mapAxiosToAuthError } from '@/common/libs/axios/error-map';
import { err } from '@/common/types/result';
import { ok } from '@/common/types/result';
import { Result } from '@/common/types/result';
import { ResultResponse, ResultTResponse } from '@/common/types/resultResponse';
import { AuthError } from '@/common/libs/axios/type/error.type';
import {
  CreateFormRequest,
  FormTemplateType,
  FormType,
  SearchFormType,
  TypesRender,
} from '../types/form.types';
import { generateFieldFromExisting } from '../components/controlledField/generateFieldElement';
import {
  AppliedFilterType,
  QuestionTypeFiltersGroupType,
} from '@/common/components/filters/filters.types';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from '@/common/components/dynamic-table/dynamic-table.types';
import { PaginationResultType } from '@/common/components/pagination/pagination.types';
import { SectionType } from '../components/form-designer/context/designer-context.type';

export const formService = {
  async createForm(
    payload: CreateFormRequest
  ): Promise<Result<ResultTResponse<string>, AuthError>> {
    try {
      const { data } = await api.protected.post<ResultTResponse<string>>(
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
      const { data } = await api.protected.get<FormType[]>('/me/forms');
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async getTypesRender(): Promise<Result<TypesRender[], AuthError>> {
    try {
      const { data } = await api.protected.get<TypesRender[]>(
        '/master/types-render'
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },
  async getFormById(idForm: string): Promise<Result<FormType, AuthError>> {
    try {
      const { data } = await api.protected.get<FormType>(`/me/form/${idForm}`);
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
      const { data } = await api.protected.post<ResultResponse>(
        `/form/${idForm}/structure`,
        payload
      );
      return ok(data); // data = token string
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async updateFormBasicInformation(
    idForm: string,
    name: string,
    description?: string
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const payload = {
        name,
        description,
      };
      const { data } = await api.protected.put<ResultResponse>(
        `/form/${idForm}/basic-info`,
        payload
      );
      return ok(data); // data = token string
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },
  async updateRenderMode(
    idForm: string,
    idTypeRender: string
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const payload = {
        idTypeRender,
      };
      const { data } = await api.protected.put<ResultResponse>(
        `/form/${idForm}/render-mode`,
        payload
      );
      return ok(data); // data = token string
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },
  async publishForm(
    idForm: string,
    payload: SectionType[]
  ): Promise<Result<ResultTResponse<FormType>, AuthError>> {
    try {
      const { data } = await api.protected.put<ResultTResponse<FormType>>(
        `/form/${idForm}/publish`,
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
      const { data } = await api.protected.get<SectionType[]>(
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
      return err(mapAxiosToAuthError(e));
    }
  },

  async getFormTemplateByIdForm(
    idForm: string
  ): Promise<Result<FormTemplateType, AuthError>> {
    try {
      const { data } = await api.protected.get<FormTemplateType>(
        `/form/${idForm}/submission-template`
      );

      const sections = data.sections.map((section) => {
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

      const result: FormTemplateType = {
        sections: sections,
        form: data.form,
      };
      return ok(result);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async submitForm(
    idForm: string,
    payload: unknown
  ): Promise<Result<ResultResponse, AuthError>> {
    try {
      const { data } = await api.protected.post<ResultResponse>(
        `/form/${idForm}/submit`,
        payload
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async searchForms(
    page: number,
    pageSize: number,
    filters: AppliedFilterType[]
  ): Promise<Result<PaginationResultType<SearchFormType>, AuthError>> {
    try {
      const { data } = await api.protected.post<
        PaginationResultType<SearchFormType>
      >(`/me/forms/search?page=${page}&pageSize=${pageSize}`, filters);
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async getSubmissionsByFormId(
    idForm: string,
    page: number,
    pageSize: number,
    filters: AppliedFilterType[]
  ): Promise<Result<PaginationResultType<DynamicTableRowType>, AuthError>> {
    try {
      const { data } = await api.protected.post<
        PaginationResultType<DynamicTableRowType>
      >(
        `/form/${idForm}/submissions/rows?page=${page}&pageSize=${pageSize}`,
        filters
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async getDynamicHeaderListSubmissions(
    idForm: string
  ): Promise<Result<DynamicTableColumnType[], AuthError>> {
    try {
      const { data } = await api.protected.get<DynamicTableColumnType[]>(
        `/form/${idForm}/submissions/columns`
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async getFormColumns(): Promise<Result<DynamicTableColumnType[], AuthError>> {
    try {
      const { data } =
        await api.protected.get<DynamicTableColumnType[]>(`/form/columns`);
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },

  async getQuestionTypeFiltersCatalog(): Promise<
    Result<QuestionTypeFiltersGroupType[], AuthError>
  > {
    try {
      const { data } = await api.protected.get<QuestionTypeFiltersGroupType[]>(
        `/question-type/filters`
      );
      return ok(data);
    } catch (e) {
      return err(mapAxiosToAuthError(e));
    }
  },
};
