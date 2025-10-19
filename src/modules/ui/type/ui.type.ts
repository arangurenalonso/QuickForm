export type ModalItem = {
  id: string;
  title: string;
  isOpen: boolean;
  content?: React.ReactNode;
  acceptToClose?: boolean;
  actions?: React.ReactNode;
};
