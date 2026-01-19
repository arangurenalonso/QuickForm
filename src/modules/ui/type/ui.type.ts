export type ModalItem = {
  id: string;
  title: string | React.ReactNode;
  titleDescription?: string | React.ReactNode;
  isOpen: boolean;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
};

export type FormStatusType<T> = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: ColorType;
  allowedActions: T[];
};

export type ColorType = 'info' | 'primary' | 'success' | 'warning' | 'error';

export const COLOR_BADGE_CLASSES: Record<ColorType, string> = {
  info: `
    bg-blue-100 text-blue-800
    hover:bg-blue-200
    dark:bg-blue-900 dark:text-blue-200
    dark:hover:bg-blue-800
  `,
  primary: `
    bg-indigo-100 text-indigo-800
    hover:bg-indigo-200
    dark:bg-indigo-900 dark:text-indigo-200
    dark:hover:bg-indigo-800
  `,
  success: `
    bg-green-100 text-green-800
    hover:bg-green-200
    dark:bg-green-900 dark:text-green-200
    dark:hover:bg-green-800
  `,
  warning: `
    bg-yellow-100 text-yellow-800
    hover:bg-yellow-200
    dark:bg-yellow-900 dark:text-yellow-200
    dark:hover:bg-yellow-800
  `,
  error: `
    bg-red-100 text-red-800
    hover:bg-red-200
    dark:bg-red-900 dark:text-red-200
    dark:hover:bg-red-800
  `,
};
