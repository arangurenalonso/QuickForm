'use client';
import React from 'react';
import ThemeSwitcher from '@/modules/ui/components/ThemeSwitcher';
import LogoutButton from '@/modules/auth/components/LogoutButton';
import AppLogo from '@/modules/intro/AppLogo';
import useFormStore from '../../hooks/useFormStore';
import StatusBadge from '@/common/components/molecules/StatusBadge';

const Navbar = () => {
  const { formSelected } = useFormStore();
  return (
    <nav className="grid h-[60px] w-full grid-cols-[auto_1fr_auto] items-center px-4 py-2">
      <div>
        <AppLogo />
      </div>
      <div className="justify-self-center  text-center ">
        {formSelected && (
          <>
            <h1 className="text-lg font-semibold text-foreground">
              {formSelected.name}
            </h1>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 justify-self-end">
        {formSelected && <StatusBadge status={formSelected.status} size="sm" />}
        <ThemeSwitcher />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
