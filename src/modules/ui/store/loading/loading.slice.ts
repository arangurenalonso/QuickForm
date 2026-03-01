'use client';

import { ImmerStateCreator } from '@/store/type';
import { createLoadingInitialState } from './loading.initial';
import { LoadingActions } from './loading.actions';
import { LoadingModel } from './loading.model';
export type LoadingSlice = LoadingModel & LoadingActions;

export const createLoadingSlice: ImmerStateCreator<LoadingSlice> = (set) => ({
  ...createLoadingInitialState(),

  beginLoading: (payload) =>
    set((state) => {
      state.pendingCount += 1;
      state.isLoading = state.pendingCount > 0;

      if (state.pendingCount === 1) {
        state.message = payload?.message?.trim() || undefined;
      }
    }),

  endLoading: () =>
    set((state) => {
      state.pendingCount = Math.max(0, state.pendingCount - 1);
      state.isLoading = state.pendingCount > 0;

      if (state.pendingCount === 0) {
        state.message = undefined;
      }
    }),

  setLoadingMessage: (message) =>
    set((state) => {
      if (state.pendingCount > 0) {
        state.message = message?.trim() || undefined;
      }
    }),
});
