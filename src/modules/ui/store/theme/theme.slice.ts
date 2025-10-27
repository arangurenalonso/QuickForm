'use client';
import { ImmerStateCreator } from '@/store/type';
import { ThemeActions } from './theme.actions';
import { ThemeModel } from './theme.model';
import { createThemeInitialState } from './theme.initial';

export type ThemeSlice = ThemeModel & ThemeActions;

export const createThemeSlice: ImmerStateCreator<ThemeSlice> = (set) => ({
  ...createThemeInitialState(),

  setTheme: (t) =>
    set((state) => {
      state.theme = t;
    }),
});
