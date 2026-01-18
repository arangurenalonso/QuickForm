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

export type ColorType = 'info' | 'success' | 'warning' | 'error';
