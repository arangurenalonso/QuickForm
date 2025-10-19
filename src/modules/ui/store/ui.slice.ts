'use client';

import { ImmerStateCreator } from '@/store/type';
import { createModalSlice } from './modal/modal.slice';
import { createThemeSlice } from './theme/theme.slice';
import { ModalActions } from './modal/modal.actions';
import { ModalModel } from './modal/modal.model';
import { ThemeActions } from './theme/theme.actions';
import { ThemeModel } from './theme/theme.model';

type UiModels = ThemeModel & ModalModel;

type UiActions = ThemeActions & ModalActions;

export type UiSlice = UiModels & UiActions;

export const createUiSlice: ImmerStateCreator<UiSlice> = (set, get, api) => ({
  ...createThemeSlice(set, get, api),
  ...createModalSlice(set, get, api),
});
