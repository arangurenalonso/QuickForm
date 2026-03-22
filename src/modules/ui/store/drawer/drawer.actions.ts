import { DrawerItem } from '../../type/ui.type';

export type DrawerActions = {
  openDrawer: (drawer: Omit<DrawerItem, 'isOpen'>) => void;
  closeDrawer: (id: string) => void;
  closeAllDrawers: () => void;
};
