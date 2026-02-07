import React from 'react';
import Logo from './Logo';
import ThemeSwitcher from '@/modules/ui/components/ThemeSwitcher';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center  h-[60px] px-4 py-2">
      <Logo />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
