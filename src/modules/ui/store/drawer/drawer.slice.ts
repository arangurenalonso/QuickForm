'use client';

import { ImmerStateCreator } from '@/store/type';
import { createDrawerInitialState } from './drawer.initial';
import { DrawerActions } from './drawer.actions';
import { DrawerModel } from './drawer.model';

export type DrawerSlice = DrawerModel & DrawerActions;

export const createDrawerSlice: ImmerStateCreator<DrawerSlice> = (
  set,
  get
) => ({
  ...createDrawerInitialState(),

  openDrawer: (drawer) =>
    set((state) => {
      state.drawers.push({
        ...drawer,
        isOpen: true,
      });
    }),

  closeDrawer: (id) => {
    const drawer = get().drawers.find((x) => x.id === id);
    const onClose = drawer?.onClose;

    set((state) => {
      state.drawers = state.drawers.filter((x) => x.id !== id);
    });

    onClose?.();
  },

  closeAllDrawers: () =>
    set((state) => {
      state.drawers = [];
    }),
});
