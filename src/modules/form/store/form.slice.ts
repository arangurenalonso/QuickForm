'use client';

import type { ImmerStateCreator } from '@/store/type';
import type { FormActions } from './form.actions';
import { createFormInitialState } from './form.initial';
import type { FormModel } from './form.model';

export type FormSlice = FormActions & FormModel;

export const createFormSlice: ImmerStateCreator<FormSlice> = (set) => ({
  ...createFormInitialState(),

  setFormSelected: (formSelected) => {
    set((state) => {
      state.formSelected = formSelected;
    });
  },

  clearFormSelected: () => {
    set((state) => {
      state.formSelected = null;
    });
  },
});
