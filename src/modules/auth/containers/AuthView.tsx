'use client';

import { CustomLink } from '@/common/components/atoms/CustomLink';
import AuthFormLayout from '../components/layout/AuthFormLayout';
import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';
import TitleWithThemeToggle from '../components/TitleWithThemeToggle';
import { ActionAuthViewEnum } from '../enum/auth.enum';
import TextWithLink from '@/common/components/TextWithLink';
import ForgotPasswordForm from '../components/form/ForgotPasswordForm';
import HelperText from '@/common/components/atoms/HelperText';
import EmailConfirmation from '../components/form/EmailConfirmationForm';
import { Separator } from '@/components/ui/separator';
import ResendVerifyEmailForm from '../components/form/ResendVerifyEmailForm';

type LoginViewProps = {
  action: ActionAuthViewEnum;
};
type SecondaryActionLinkProps = {
  mainText: React.ReactNode;
  linkText: string | null | undefined;
  href: string;
  invertUnderline: boolean;
};
type AuxiliaryLinkType = {
  linkText: string | null | undefined;
  href: string;
  invertUnderline: boolean;
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
      invertUnderline: true,
    },
    auxiliaryLink: {
      linkText: 'Forgot your password?',
      href: '/auth/forgot-password',
      invertUnderline: false,
    },
  },
  [ActionAuthViewEnum.REGISTER]: {
    title: 'Sign up',
    node: <RegisterForm />,
    secondaryActionLink: {
      mainText: 'Already have an account?',
      linkText: 'Sign in',
      href: '/auth/login',
      invertUnderline: false,
    },
  },
  [ActionAuthViewEnum.FORGOT_PASSWORD]: {
    title: 'Recover your password',
    node: <ForgotPasswordForm />,
    helperText:
      'Please enter your email address to receive a password reset link.',
    secondaryActionLink: {
      mainText: '',
      linkText: 'Already have the reset code',
      href: '/auth/reset-password',
      invertUnderline: true,
    },
  },
  [ActionAuthViewEnum.EMAIL_CONFIRMATION]: {
    title: 'Confirm your email',
    node: <EmailConfirmation />,
  },
  [ActionAuthViewEnum.RESENT_VERIFICATION]: {
    title: 'Resend verification email',
    helperText: 'Enter your email address to receive a new verification email.',
    node: <ResendVerifyEmailForm />,
    secondaryActionLink: {
      mainText: 'Already verified?',
      linkText: 'Sign in',
      href: '/auth/login',
      invertUnderline: false,
    },
  },
};

const LoginView = ({ action }: LoginViewProps) => {
  const view = VIEW_MAP[action] ?? VIEW_MAP[ActionAuthViewEnum.LOGIN];

  return (
    <AuthFormLayout>
      <TitleWithThemeToggle title={view.title} />
      <Separator className="my-6" />
      {view.helperText && <HelperText>{view.helperText}</HelperText>}
      {view.node}
      {view.auxiliaryLink && (
        <CustomLink
          href={view.auxiliaryLink.href}
          linkText={view.auxiliaryLink.linkText!}
          invertUnderline={view.auxiliaryLink.invertUnderline}
        />
      )}
      {view.secondaryActionLink && (
        <TextWithLink
          mainText={view.secondaryActionLink.mainText}
          linkText={view.secondaryActionLink.linkText!}
          href={view.secondaryActionLink.href!}
          invertUnderline={view.secondaryActionLink.invertUnderline}
        />
      )}
    </AuthFormLayout>
  );
};
export default LoginView;
