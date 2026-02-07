'use client';

import { FORM_ACTION } from '@/modules/form/enum/form.enum';
import { ReactNode } from 'react';

type ActionGuardProps = {
  /** acciones actuales del backend */
  currentActions?: FORM_ACTION[] | null | undefined;

  /** acciones requeridas para mostrar */
  allowedActions: FORM_ACTION[];

  /** modo de validación */
  mode?: 'ANY' | 'ALL';

  children: ReactNode;
};

const ActionGuard = ({
  currentActions,
  allowedActions,
  mode = 'ANY',
  children,
}: ActionGuardProps) => {
  if (!currentActions || currentActions.length === 0) return null;
  const current = currentActions || [];

  const isAllowed =
    mode === 'ALL'
      ? allowedActions.every((a) => current.includes(a))
      : allowedActions.some((a) => current.includes(a));

  if (!isAllowed) return null;

  return <>{children}</>;
};

export default ActionGuard;
