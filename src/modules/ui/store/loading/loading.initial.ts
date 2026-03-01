import { LoadingModel } from './loading.model';

export const createLoadingInitialState = (): LoadingModel => ({
  pendingCount: 0,
  message: undefined,
  isLoading: false,
});
