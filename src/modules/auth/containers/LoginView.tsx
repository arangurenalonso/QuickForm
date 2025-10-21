// src/modules/auth/containers/LoginView.tsx
'use client';

import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';
import TitleWithThemeToggle from '../components/TitleWithThemeToggle';

export function LoginView() {
  return (
    <div className="w-full max-w-[400px] mx-auto p-2">
      <TitleWithThemeToggle title="Sign in" showWellCome />
      <LoginForm />
      <RegisterForm />
    </div>
  );
}
