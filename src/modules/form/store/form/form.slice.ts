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
  setPersistedStructure: (value) => {
    set((state) => {
      state.persistedStructure = value;
    });
  },
  setDraftStructure: (value) => {
    set((state) => {
      state.draftStructure = value;
    });
  },
  setTypeRender: (value) => {
    set((state) => {
      state.typeRender = value;
    });
  },
  setRenderMode: async (idTypeRender) => {
    set((state) => {
      const typeRender = state.typeRender.find(
        (type) => type.id === idTypeRender
      );
      if (state.formSelected && typeRender) {
        state.formSelected.renderMode = {
          id: typeRender.id,
          keyName: typeRender.keyName,
        };
      }
    });
  },
  updateBasicInformation: async (name, description) => {
    set((state) => {
      if (state.formSelected) {
        state.formSelected.name = name;
        state.formSelected.description = description;
      }
    });
  },
});
