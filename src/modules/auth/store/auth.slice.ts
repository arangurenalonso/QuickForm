'use client';

import { createAuthInitialState } from './auth.initial';
import { AuthActions } from './auth.actions';
import { AuthModel } from './auth.model';
import { ImmerStateCreator } from '@/store/type';

export type AuthSlice = AuthActions & AuthModel;

export const createAuthSlice: ImmerStateCreator<AuthSlice> = (set) => ({
  ...createAuthInitialState(),

  setSession: ({ user }) => {
    set((state) => {
      state.user = user;
      state.isAuthenticated = true;
    });
  },

  clearSession: () => {
    set((state) => {
      const init = createAuthInitialState();
      state.isAuthenticated = init.isAuthenticated;
      state.user = init.user;
    });
  },
});
