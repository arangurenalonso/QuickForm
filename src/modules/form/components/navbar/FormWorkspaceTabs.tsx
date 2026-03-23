'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/common/libs/utils';
import {
  FormWorkspaceTab,
  FormWorkspaceTabSegment,
} from '../../types/form.types';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import { FORM_ACTION } from '../../enum/form.enum';
import SaveFormBtn from '../form-designer/component/navbar/navbar-btn/SaveFormBtn';
import useFormStore from '../../hooks/useFormStore';

type FormWorkspaceTabsProps = {
  basePath: string;
};

type FormWorkspaceTabType = {
  label: string;
  segment: FormWorkspaceTabSegment;
};

const tabs: FormWorkspaceTabType[] = [
  { label: 'Build', segment: FormWorkspaceTab.builder },
  { label: 'Settings', segment: FormWorkspaceTab.settings },
  { label: 'Publish', segment: FormWorkspaceTab.publish },
];

const FormWorkspaceTabs = ({ basePath }: FormWorkspaceTabsProps) => {
  const searchParams = useSearchParams();
  const { formSelected } = useFormStore();
  const currentTab = searchParams.get('tab') ?? FormWorkspaceTab.builder;

  return (
    <div className="grid h-12 w-full grid-cols-[1fr_auto_1fr] items-stretch">
      <div />

      <div className="flex h-full items-stretch">
        {tabs.map((tab) => {
          const href = `${basePath}?tab=${tab.segment}`;
          const isActive = currentTab === tab.segment;

          return (
            <Link
              key={tab.segment}
              href={href}
              className={cn(
                'inline-flex min-w-[140px] items-center justify-center border-x px-6 text-sm font-semibold uppercase tracking-wide transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-muted-foreground hover:bg-background hover:text-foreground'
              )}
            >
              {tab.label}
            </Link>
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
