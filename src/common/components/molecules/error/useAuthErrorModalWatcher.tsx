'use client';

import AuthErrorAlertBody from './AuthErrorAlertBody';
import AuthErrorAlertTitle from './AuthErrorAlertTitle';
import { AuthError } from '@/common/libs/axios/type/error.type';
import { useEffect } from 'react';
import { SHOW_ERROR_TYPE } from './auth-error.enum';
import { useToast } from '@/hooks/use-toast';
import useModalhook from '@/modules/ui/store/modal/useModalhook';

type AuthErrorModalWatcherProps = {
  error: AuthError | null | undefined;
  id: string;
  showProperties?: boolean;
  onClose?: () => void;
  showErrorType?: SHOW_ERROR_TYPE | undefined;
};

const useAuthErrorModalWatcher = ({
  error,
  id,
  onClose,
  showProperties = false,
  showErrorType = SHOW_ERROR_TYPE.Modal,
}: AuthErrorModalWatcherProps) => {
  const { openModal } = useModalhook();

  const { toast } = useToast();

  useEffect(() => {
    if (!error) return;
    switch (showErrorType) {
      case SHOW_ERROR_TYPE.Modal:
        openModal({
          id,
          title: <AuthErrorAlertTitle error={error} />,
          content: (
            <AuthErrorAlertBody error={error} showProperties={showProperties} />
          ),
          onClose: onClose,
        });
        break;
      case SHOW_ERROR_TYPE.Toast:
        const message = error.message ?? JSON.stringify(error);
        toast({
          title: 'Error',
          description: `Something went wrong, please try again later. ${message}`,
          variant: 'destructive',
        });
        return;
      default:
        return;
    }
  }, [error, id, onClose, openModal, showProperties, showErrorType, toast]);

  return null;
};

export default useAuthErrorModalWatcher;
