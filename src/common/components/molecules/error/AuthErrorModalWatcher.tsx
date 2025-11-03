'use client';

import * as React from 'react';
import { useBoundStore } from '@/store';
import AuthErrorAlertBody from './AuthErrorAlertBody';
import AuthErrorAlertTitle from './AuthErrorAlertTitle';
import { AuthError } from '@/common/libs/axios/type/error.type';

type AuthErrorModalWatcherProps = {
  error: AuthError | null | undefined;
  id: string;
  showProperties?: boolean;
  onClose?: () => void;
};

export default function AuthErrorModalWatcher({
  error,
  id,
  onClose,
  showProperties = false,
}: AuthErrorModalWatcherProps) {
  const openModal = useBoundStore((s) => s.openModal);
  React.useEffect(() => {
    if (!error) return;

    openModal({
      id,
      title: <AuthErrorAlertTitle error={error} />,
      content: (
        <AuthErrorAlertBody error={error} showProperties={showProperties} />
      ),
      onClose: onClose,
    });
  }, [error]);

  return null;
}
