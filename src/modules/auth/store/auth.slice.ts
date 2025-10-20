'use client';

import { createAuthInitialState } from './auth.initial';
import { AuthActions } from './auth.actions';
import { AuthModel } from './auth.model';
import { ImmerStateCreator } from '@/store/type';

export type AuthSlice = AuthActions & AuthModel;

export const createAuthSlice: ImmerStateCreator<AuthSlice> = (set) => ({
  ...createAuthInitialState(),

  signIn: ({ user }) => {
    set((state) => {
      state.user = user;
    });
  },
  setAccessToken: (token: string) => {
    set((state) => {
      state.token = token;
      state.isAuthenticated = true;
    });
  },
  signOut: () => {
    set((state) => {
      const init = createAuthInitialState();
      state.isAuthenticated = init.isAuthenticated;
      state.user = init.user;
      state.token = init.token;
    });
  },
  // signOut: () => set(() => createAuthInitialState()),
});
