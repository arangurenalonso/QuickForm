import { ImmerStateCreator } from '@/store/type';
import { createModalInitialState } from './modal.initial';
import { ModalActions } from './modal.actions';
import { ModalModel } from './modal.model';

export type ModalSlice = ModalModel & ModalActions;

export const createModalSlice: ImmerStateCreator<ModalSlice> = (set) => ({
  ...createModalInitialState(),

  openModal: (m) =>
    set((state) => {
      state.modals.push({ ...m, isOpen: true });
    }),

  closeModal: (id) =>
    set((state) => {
      state.modals = state.modals.filter((x) => x.id !== id);
    }),

  closeAllModals: () =>
    set((state) => {
      state.modals = [];
    }),
});
