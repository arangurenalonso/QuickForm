'use client';

import { LOGIN_PATH } from '@/common/libs/auth/auth.constants';
import { Button } from '@/common/libs/ui/button';
import useAuthStore from '@/modules/auth/hooks/useAuthStore';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logoutProcess } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutProcess();
    router.replace(LOGIN_PATH);
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
