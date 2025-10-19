'use client';

import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createUiSlice, UiSlice } from '@/modules/ui/store/ui.slice';
import { AuthSlice, createAuthSlice } from '@/modules/auth/store/auth.slice';

export type BoundState = AuthSlice & UiSlice;

export const useBoundStore = create<BoundState>()(
  devtools(
    persist(
      immer((set, get, api) => ({
        ...createAuthSlice(set, get, api),
        ...createUiSlice(set, get, api),
      })),
      {
        name: 'quick-form-storage',
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          token: state.token,
          user: state.user,
          theme: state.theme,
        }),
      }
    ),
    { name: 'bound-store' }
  )
);
