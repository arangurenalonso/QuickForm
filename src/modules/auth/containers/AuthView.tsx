'use client';

import { CustomLink } from '@/common/components/atoms/CustomLink';
import AuthFormLayout from '../components/form/AuthFormLayout';
import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';
import TitleWithThemeToggle from '../components/TitleWithThemeToggle';
import { ActionAuthViewEnum } from '../enum/auth.enum';
import TextWithLink from '@/common/components/TextWithLink';
import ForgotPasswordForm from '../components/form/ForgotPasswordForm';
import HelperText from '@/common/components/atoms/HelperText';

type LoginViewProps = {
  action: ActionAuthViewEnum;
};
type SecondaryActionLinkProps = {
  mainText: React.ReactNode;
  linkText: string | null | undefined;
  href: string;
};
type AuxiliaryLinkType = {
  linkText: string | null | undefined;
  href: string;
};

const VIEW_MAP: Record<
  ActionAuthViewEnum,
  {
    title: string;
    node: React.ReactNode;
    secondaryActionLink?: SecondaryActionLinkProps | undefined | null;
    auxiliaryLink?: AuxiliaryLinkType | null | undefined;
    helperText?: string;
  }
> = {
  [ActionAuthViewEnum.LOGIN]: {
    title: 'Sign in',
    node: <LoginForm />,
    secondaryActionLink: {
      mainText: "Don't have an account?",
      linkText: 'Sign up',
      href: '/auth/register',
    },
    auxiliaryLink: {
      linkText: 'Forgot your password?',
      href: '/auth/forgot-password',
    },
  },
  [ActionAuthViewEnum.REGISTER]: {
    title: 'Sign up',
    node: <RegisterForm />,
    secondaryActionLink: {
      mainText: 'Already have an account?',
      linkText: 'Sign in',
      href: '/auth/login',
    },
  },
  [ActionAuthViewEnum.FORGOT_PASSWORD]: {
    title: 'Recover your password',
    node: <ForgotPasswordForm />,
    helperText:
      'Please enter your email address to receive a password reset link.',
  },
};

const LoginView = ({ action }: LoginViewProps) => {
  const view = VIEW_MAP[action] ?? VIEW_MAP[ActionAuthViewEnum.LOGIN];

  return (
    <AuthFormLayout>
      <TitleWithThemeToggle title={view.title} showWellCome />
      {view.helperText && <HelperText>{view.helperText}</HelperText>}

      {view.node}
      {view.auxiliaryLink && (
        <CustomLink
          href={view.auxiliaryLink.href}
          linkText={view.auxiliaryLink.linkText!}
        />
      )}
      {view.secondaryActionLink && (
        <TextWithLink
          mainText={view.secondaryActionLink.mainText}
          linkText={view.secondaryActionLink.linkText!}
          href={view.secondaryActionLink.href!}
        />
      )}
    </AuthFormLayout>
  );
};
export default LoginView;
