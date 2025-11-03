import { RulesValidate } from '@/common/components/molecules/inputRule/type';
import { RegisterOptions } from 'react-hook-form';

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
};

export type LoginRequest = { email: string; password: string };

export type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type ResendVerifyEmailRequest = { email: string };
export type ForgotPasswordRequest = { email: string };

export type EmailConfirmationRequest = {
  email: string;
  verificationCode: string;
};

export type ApiUser = { id: string; email: string; name: string | null };

export type LoginResponseBody = {
  ok: boolean;
  message?: string;
  user?: ApiUser;
  accessToken?: string; // si tu .NET lo manda en body
  refreshToken?: string; // si tu .NET lo manda en body
};

export type MeResponseBody = {
  ok: boolean;
  user: ApiUser | null;
};

export type RefreshResponse = {
  accessToken: string; // devuelto por /auth/refresh (refresh en cookie httpOnly)
};

function escapeForCharClass(input: string): string {
  return input.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
}
export function toRHFValidate(
  rules: RulesValidate[]
): NonNullable<RegisterOptions['validate']> {
  return Object.fromEntries(
    rules.map((r) => [
      r.id,
      (v: string) => r.test(v) || r.label, // return label as error message
    ])
  );
}

// Optional: if you prefer ONE aggregated message instead of many:
export function toRHFValidateAsSingleMessage(
  rules: RulesValidate[]
): NonNullable<RegisterOptions['validate']> {
  return (v: string) => {
    const missing = rules.filter((r) => !r.test(v)).map((r) => `• ${r.label}`);
    return missing.length === 0 || missing.join('\n');
  };
}
export const makePasswordRules = (
  minLength = 8,
  forbiddenChars = ''
): RulesValidate[] => {
  const hasForbidden = Boolean(forbiddenChars);
  const forbiddenRe = hasForbidden
    ? new RegExp(`[${escapeForCharClass(forbiddenChars)}]`)
    : null;

  return [
    {
      id: 'len',
      label: `Min. ${minLength} caracteres`,
      test: (p: string) => (p ?? '').length >= minLength,
      group: 'left',
    },
    {
      id: 'upper',
      label: '1 mayúscula',
      test: (p: string) => /[A-Z]/.test(p ?? ''),
      group: 'left',
    },
    {
      id: 'lower',
      label: '1 minúscula',
      test: (p: string) => /[a-z]/.test(p ?? ''),
      group: 'left',
    },
    {
      id: 'digit',
      label: '1 número',
      test: (p: string) => /\d/.test(p ?? ''),
      group: 'right',
    },
    {
      id: 'space',
      label: 'Sin espacio',
      test: (p: string) => !/\s/.test(p ?? ''),
      group: 'right',
    },
    ...(hasForbidden
      ? [
          {
            id: 'forbidden',
            label: `Sin usar ${forbiddenChars}`,
            test: (p: string) => !forbiddenRe!.test(p ?? ''),
            group: 'right',
          } as RulesValidate,
        ]
      : []),
  ];
};
