'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import { cn } from '@/common/libs/utils';
import {
  FormWorkspaceTab,
  FormWorkspaceTabSegment,
} from '../../types/form.types';

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
  const currentTab = searchParams.get('tab') ?? FormWorkspaceTab.builder;

  return (
    <div className="grid h-12 w-full grid-cols-[1fr_auto_1fr] items-stretch">
      <div />

      <div className="flex h-full items-stretch">
        {tabs.map((tab) => {
          const href = `${basePath}?tab=${tab.segment}`;
          console.log(href);
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

      <div className="flex items-center justify-end px-4">
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </div>
    </div>
  );
};

export default FormWorkspaceTabs;
