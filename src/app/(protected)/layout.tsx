import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  LOGIN_PATH,
} from '@/common/libs/auth/auth.constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
type ProtectedLayoutProps = {
  children: React.ReactNode;
};
export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const cookieStore = await cookies();

  const hasAnySessionCookie = Boolean(
    cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ||
    cookieStore.get(REFRESH_TOKEN_COOKIE)?.value
  );

  if (!hasAnySessionCookie) {
    redirect(LOGIN_PATH);
  }

  return <div className="w-full min-h-screen">{children}</div>;
}
