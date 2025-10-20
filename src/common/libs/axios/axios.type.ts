import { AxiosInstance } from 'axios';

export type ApiKey = 'auth';

export type ClientsRegistry = Record<ApiKey, AxiosInstance>;
