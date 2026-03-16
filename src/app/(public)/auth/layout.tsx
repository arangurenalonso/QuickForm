'use server';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  DEFAULT_AUTH_REDIRECT,
} from '@/common/libs/auth/auth.constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Readonly<AuthLayoutProps>) {
  console.log('Auth layout - checking for session cookies...');
  const cookieStore = await cookies();

  const hasAnySessionCookie = Boolean(
    cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ||
    cookieStore.get(REFRESH_TOKEN_COOKIE)?.value
  );

  console.log('Auth layout - session cookie presence:', {
    accessTokenCookie: Boolean(cookieStore.get(ACCESS_TOKEN_COOKIE)?.value),
    refreshTokenCookie: Boolean(cookieStore.get(REFRESH_TOKEN_COOKIE)?.value),
    hasAnySessionCookie,
  });
  if (hasAnySessionCookie) {
    redirect(DEFAULT_AUTH_REDIRECT);
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-0">
      <div className="w-full max-w-[600px]">{children}</div>
    </div>
  );
}
