export type ModalItem = {
  id: string;
  title: string | React.ReactNode;
  titleDescription?: string | React.ReactNode;
  isOpen: boolean;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
};
