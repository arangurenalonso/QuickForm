'use client';

import Navbar from '@/modules/form/components/navbar/Navbar';
import FormWorkspaceTabs from '@/modules/form/components/navbar/FormWorkspaceTabs';
import useFormStore from '@/modules/form/hooks/useFormStore';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<LayoutProps>) {
  const { formSelected } = useFormStore();

  return (
    <div className="grid h-dvh w-full grid-rows-[auto_1fr]">
      <header>
        <Navbar />
        <div className="border-b" />
        {formSelected && (
          <FormWorkspaceTabs basePath={`/builder/${formSelected.id}`} />
        )}
        <div className="border-b" />
      </header>

      <main className="min-h-0 overflow-hidden">{children}</main>
    </div>
  );
}
