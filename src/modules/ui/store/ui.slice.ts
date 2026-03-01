'use client';
import { ImmerStateCreator } from '@/store/type';
import { createModalSlice } from './modal/modal.slice';
import { createThemeSlice } from './theme/theme.slice';
import { ModalActions } from './modal/modal.actions';
import { ModalModel } from './modal/modal.model';
import { ThemeActions } from './theme/theme.actions';
import { ThemeModel } from './theme/theme.model';
import { createLoadingSlice } from './loading/loading.slice';
import { LoadingActions } from './loading/loading.actions';
import { LoadingModel } from './loading/loading.model';

type UiModels = ThemeModel & ModalModel & LoadingModel;

type UiActions = ThemeActions & ModalActions & LoadingActions;

export type UiSlice = UiModels & UiActions;

export const createUiSlice: ImmerStateCreator<UiSlice> = (set, get, api) => ({
  ...createThemeSlice(set, get, api),
  ...createModalSlice(set, get, api),
  ...createLoadingSlice(set, get, api),
});
