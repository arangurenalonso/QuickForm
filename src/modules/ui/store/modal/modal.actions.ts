import { ModalItem } from '../../type/ui.type';

export type ModalActions = {
  openModal: (m: Omit<ModalItem, 'isOpen'>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
};
