'use client';

import { ImmerStateCreator } from '@/store/type';
import { createModalInitialState } from './modal.initial';
import { ModalActions } from './modal.actions';
import { ModalModel } from './modal.model';

export type ModalSlice = ModalModel & ModalActions;

export const createModalSlice: ImmerStateCreator<ModalSlice> = (set, get) => ({
  ...createModalInitialState(),

  openModal: (m) =>
    set((state) => {
      state.modals.push({ ...m, isOpen: true });
    }),

  closeModal: (id) => {
    const modal = get().modals.find((x) => x.id === id);
    const onClose = modal?.onClose;
    set((state) => {
      state.modals = state.modals.filter((x) => x.id !== id);
    });
    onClose?.();
  },

  closeAllModals: () =>
    set((state) => {
      state.modals = [];
    }),
});
