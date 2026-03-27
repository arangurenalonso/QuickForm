'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createUiSlice, UiSlice } from '@/modules/ui/store/ui.slice';
import { AuthSlice, createAuthSlice } from '@/modules/auth/store/auth.slice';
import {
  createFormSlice,
  FormSlice,
} from '@/modules/form/store/form/form.slice';
import {
  createUnsavedChangesSlice,
  UnsavedChangesSlice,
} from '@/modules/ui/store/unsaved-changes/unsaved-changes.slice';

export type BoundState = AuthSlice & UiSlice & FormSlice & UnsavedChangesSlice;

export const useBoundStore = create<BoundState>()(
  // devtools(
  persist(
    immer((set, get, api) => ({
      ...createAuthSlice(set, get, api),
      ...createUiSlice(set, get, api),
      ...createFormSlice(set, get, api),
      ...createUnsavedChangesSlice(set, get, api),
    })),
    {
      name: 'quick-form-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
  // { name: 'bound-store' }
  // )
);
