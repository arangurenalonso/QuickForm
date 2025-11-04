'use client';
import { useBoundStore } from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const hasSession = (token?: string | null | undefined) => {
  return !!token && token.length > 0;
};

export default function Layout({ children }: Readonly<AuthLayoutProps>) {
  const token = useBoundStore((state) => state.token);
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get('next') ?? '/dashboard';
  //   const hydrated = useZustandHydrated();

  useEffect(() => {
    if (hasSession(token)) {
      router.replace(next);
    }
  }, [token]);

  if (hasSession(token)) return null;

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-0">
      <div className="w-full max-w-[600px]">{children}</div>
    </div>
  );
}
