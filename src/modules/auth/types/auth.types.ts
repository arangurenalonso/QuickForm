export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
};

export type SessionResponse = {
  isAuthenticated: boolean;
  user: AuthUser | null;
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

export type ResetPasswordRequest = {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
};
