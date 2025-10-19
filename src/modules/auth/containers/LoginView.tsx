// src/modules/auth/containers/LoginView.tsx
'use client';

import { LoginForm } from '../components/LoginForm';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';

export function LoginView() {
  return (
    <div className="w-full max-w-[400px] mx-auto">
      <TitleWithThemeToggle title="Sign in" showWellCome />
      <LoginForm />
    </div>
  );
}
