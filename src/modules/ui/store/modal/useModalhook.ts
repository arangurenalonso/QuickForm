import { useBoundStore } from '@/store';
import { useMemo } from 'react';

const useModalhook = () => {
  const openModal = useBoundStore((s) => s.openModal);
  const closeModal = useBoundStore((s) => s.closeModal);
  const closeAllModals = useBoundStore((s) => s.closeAllModals);
  const modals = useBoundStore((s) => s.modals);

  return useMemo(
    () => ({
      modals,
      openModal,
      closeModal,
      closeAllModals,
    }),
    [openModal, closeModal, closeAllModals, modals]
  );
};

export default useModalhook;
