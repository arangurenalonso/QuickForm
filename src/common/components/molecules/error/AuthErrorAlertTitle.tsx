import { KIND_UI } from './auth-error.type';
import { AuthError } from '@/common/libs/axios/type/error.type';

type AuthErrorAlertTitleProps = {
  error: AuthError | null | undefined;
};

const AuthErrorAlertTitle = ({ error }: AuthErrorAlertTitleProps) => {
  if (!error) return null;
  const ui = KIND_UI[error.kind] ?? KIND_UI.Unknown;
  const Icon = ui.icon;

  return (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 mt-0.5" aria-hidden />
      <p className="text-base font-semibold">{ui.title}</p>
    </div>
  );
};

export default AuthErrorAlertTitle;
