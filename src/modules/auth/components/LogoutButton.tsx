'use client';

import { LOGIN_PATH } from '@/common/libs/auth/auth.constants';
import { Button } from '@/common/libs/ui/button';
import useAuthStore from '@/modules/auth/hooks/useAuthStore';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const { logoutProcess } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutProcess();
    router.replace(LOGIN_PATH);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleLogout}>
      <LogOut className="h-5 w-5" />
    </Button>
  );
}
