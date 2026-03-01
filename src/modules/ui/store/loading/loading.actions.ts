export type LoadingActions = {
  beginLoading: (payload?: { message?: string }) => void;
  endLoading: () => void;
  setLoadingMessage: (message?: string) => void;
};
