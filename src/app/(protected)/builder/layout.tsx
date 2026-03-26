'use client';

import Navbar from '@/modules/form/components/navbar/Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="grid h-dvh w-full grid-rows-[auto_1fr]">
      <header>
        <Navbar />
        <div className="border-b" />
      </header>

      <main className="min-h-0 overflow-hidden">{children}</main>
    </div>
  );
}
