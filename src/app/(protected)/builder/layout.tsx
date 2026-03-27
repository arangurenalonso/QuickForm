'use client';

import FormWorkspaceTabs from '@/modules/form/components/navbar/FormWorkspaceTabs';
import Navbar from '@/modules/form/components/navbar/Navbar';
import useFormStore from '@/modules/form/hooks/useFormStore';
import useUnsavedChangesStore from '@/modules/ui/store/unsaved-changes/useUnsavedChangesStore';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { UnsavedChangesScope } from '@/modules/ui/store/unsaved-changes/unsaved-changes.methods';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<LayoutProps>) {
  const router = useRouter();
  const { formSelected } = useFormStore();

  const guardScope = useMemo(() => {
    return UnsavedChangesScope.formBuilder(formSelected?.id);
  }, [formSelected?.id]);

  const { requestNavigation } = useUnsavedChangesStore(guardScope);
  const handleBeforeTabChange = useCallback(
    (nextUrl: string) => {
      const shouldContinue = requestNavigation(nextUrl);

      if (shouldContinue) {
        router.push(nextUrl);
      }
    },
    [requestNavigation, router]
  );

  return (
    <div className="grid h-dvh w-full grid-rows-[auto_1fr]">
      <header>
        <Navbar />
        {formSelected && (
          <FormWorkspaceTabs
            basePath={`/builder/${formSelected.id}`}
            onBeforeTabChange={handleBeforeTabChange}
          />
        )}
        <div className="border-b" />
        <div className="border-b" />
      </header>

      <main className="min-h-0 overflow-hidden">{children}</main>
    </div>
  );
}
