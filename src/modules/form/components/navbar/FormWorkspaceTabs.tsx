'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/common/libs/utils';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import { FORM_ACTION, FormWorkspaceTab } from '../../enum/form.enum';
import SaveFormBtn from '../form-designer/component/navbar/navbar-btn/SaveFormBtn';
import useFormStore from '../../hooks/useFormStore';
import { useEffect, useMemo } from 'react';
import { tabs } from '../../utils/form.const';

type FormWorkspaceTabsProps = {
  basePath: string;
  onBeforeTabChange?: (nextUrl: string) => void;
};

const FormWorkspaceTabs = ({
  basePath,
  onBeforeTabChange,
}: FormWorkspaceTabsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formSelected, isPublished } = useFormStore();

  const currentTab = searchParams.get('tab') ?? FormWorkspaceTab.builder;

  const handleNavigate = (url: string) => {
    if (onBeforeTabChange) {
      onBeforeTabChange(url);
      return;
    }

    router.push(url);
  };
  const visibleTabs = useMemo(() => {
    return tabs.filter((tab) => {
      if (tab.segment === FormWorkspaceTab.publish && !isPublished) {
        return false;
      }

      return true;
    });
  }, [isPublished]);

  useEffect(() => {
    if (
      currentTab === FormWorkspaceTab.publish &&
      !isPublished &&
      formSelected?.id
    ) {
      router.replace(
        `/builder/${formSelected.id}?tab=${FormWorkspaceTab.builder}`
      );
    }
  }, [currentTab, isPublished, formSelected, router]);

  return (
    <div className="grid h-12 w-full grid-cols-[1fr_auto_1fr] items-stretch">
      <div />

      <div className="flex h-full items-stretch">
        {visibleTabs.map((tab) => {
          const href = `${basePath}?tab=${tab.segment}`;
          const isActive = currentTab === tab.segment;

          return (
            <button
              key={tab.segment}
              type="button"
              onClick={() => handleNavigate(href)}
              className={cn(
                'inline-flex min-w-[140px] items-center justify-center border-x px-6 text-sm font-semibold uppercase tracking-wide transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-muted-foreground hover:bg-background hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {currentTab === FormWorkspaceTab.builder && formSelected && (
        <div className="flex items-center justify-end px-4">
          <ActionGuard
            currentActions={formSelected?.status.allowedActions}
            allowedActions={[FORM_ACTION.Edit]}
          >
            <SaveFormBtn />
          </ActionGuard>
        </div>
      )}
    </div>
  );
};

export default FormWorkspaceTabs;
