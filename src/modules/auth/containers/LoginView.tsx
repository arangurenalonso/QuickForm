// src/modules/auth/containers/LoginView.tsx
'use client';

import LoginForm from '../components/LoginForm';
import TitleWithThemeToggle from '../components/TitleWithThemeToggle';

export function LoginView() {
  return (
    <div className="w-full max-w-[400px] mx-auto p-2">
      <TitleWithThemeToggle title="Sign in" showWellCome />
      <LoginForm />
    </div>
  );
}
