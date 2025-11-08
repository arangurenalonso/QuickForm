'use client';

import { Alert } from '@/common/libs/ui/alert';
import { cn } from '@/common/libs/utils';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { KIND_UI } from './auth-error.type';
import AuthErrorAlertTitle from './AuthErrorAlertTitle';
import AuthErrorAlertBody from './AuthErrorAlertBody';
import { useRef, useEffect } from 'react';

export type AuthErrorAlertProps = {
  error: AuthError | null | undefined;
  className?: string;
};

export default function AuthErrorAlert({
  error,
  className,
}: AuthErrorAlertProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!error) return;
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [error]);

  if (!error) return null;

  const ui = KIND_UI[error.kind] ?? KIND_UI.Unknown;

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <Alert
        role="alert"
        aria-live="assertive"
        variant={ui.variant}
        className={cn('flex flex-col gap-3')}
      >
        <AuthErrorAlertTitle error={error} />
        <AuthErrorAlertBody error={error} showProperties={true} />
      </Alert>
    </div>
  );
}
