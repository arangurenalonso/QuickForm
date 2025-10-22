// src/modules/auth/containers/LoginView.tsx
'use client';

import AuthFormLayout from '../components/form/AuthFormLayout';
import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';
import TitleWithThemeToggle from '../components/TitleWithThemeToggle';
import { ActionAuthViewEnum } from '../enum/auth.enum';

type LoginViewProps = {
  action: ActionAuthViewEnum;
};

const VIEW_MAP: Record<
  ActionAuthViewEnum,
  { title: string; node: React.ReactNode }
> = {
  [ActionAuthViewEnum.LOGIN]: { title: 'Sign in', node: <LoginForm /> },
  [ActionAuthViewEnum.REGISTER]: {
    title: 'Create your account',
    node: <RegisterForm />,
  },
  [ActionAuthViewEnum.FORGOT_PASSWORD]: {
    title: 'Recover your password',
    node: <></>,
  },
};

const LoginView = ({ action }: LoginViewProps) => {
  const view = VIEW_MAP[action] ?? VIEW_MAP[ActionAuthViewEnum.LOGIN];

  return (
    <AuthFormLayout>
      <TitleWithThemeToggle title={view.title} showWellCome />
      {view.node}
    </AuthFormLayout>
  );
};
export default LoginView;
