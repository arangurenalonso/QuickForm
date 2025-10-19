import { ThemeType } from './theme.model';

export type ThemeActions = {
  setTheme: (t: ThemeType) => void;
};
