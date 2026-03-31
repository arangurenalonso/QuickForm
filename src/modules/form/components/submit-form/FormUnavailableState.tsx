'use client';

import Link from 'next/link';
import {
  AlertTriangle,
  Clock3,
  FileLock2,
  Home,
  Lock,
  PauseCircle,
} from 'lucide-react';
import { Button } from '@/common/libs/ui/button';

type FormStatusLike = {
  name?: string | null;
  description?: string | null;
};

type FormUnavailableStateProps = {
  formName?: string | null;
  status?: FormStatusLike | null;
};

function normalizeStatus(statusName?: string | null): string {
  return statusName?.trim().toLowerCase() ?? '';
}

function getStatusUi(status?: FormStatusLike | null) {
  const normalizedStatus = normalizeStatus(status?.name);

  switch (normalizedStatus) {
    case 'draft':
      return {
        icon: FileLock2,
        title: 'This form is not published yet',
        description:
          'The form exists, but it is still being prepared and is not available for public submissions yet.',
        badgeLabel: 'Draft',
      };

    case 'paused':
      return {
        icon: PauseCircle,
        title: 'This form is temporarily unavailable',
        description:
          'The form has been paused by its owner. People can no longer submit responses at the moment.',
        badgeLabel: 'Paused',
      };

    case 'closed':
      return {
        icon: Lock,
        title: 'This form is closed',
        description:
          'This form is no longer accepting responses. Submissions have been disabled by its owner.',
        badgeLabel: 'Closed',
      };

    case 'archived':
      return {
        icon: Clock3,
        title: 'This form is archived',
        description:
          'This form has been archived and is no longer available for public submissions.',
        badgeLabel: 'Archived',
      };

    case 'unpublished':
      return {
        icon: FileLock2,
        title: 'This form is not available',
        description:
          'The form is currently unpublished, so it cannot accept public responses.',
        badgeLabel: 'Unpublished',
      };

    default:
      return {
        icon: AlertTriangle,
        title: 'This form is not currently available',
        description:
          'The form cannot accept responses right now. Please try again later or contact the form owner.',
        badgeLabel: status?.name?.trim() || 'Unavailable',
      };
  }
}

const FormUnavailableState = ({
  formName,
  status,
}: FormUnavailableStateProps) => {
  const ui = getStatusUi(status);
  const StatusIcon = ui.icon;

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="w-full max-w-3xl rounded-3xl border border-border bg-card shadow-sm">
        <div className="border-b border-border bg-muted/30 px-6 py-5 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <StatusIcon className="h-7 w-7" />
              </div>

              <div>
                <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                  Current status: {ui.badgeLabel}
                </div>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  {ui.title}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {ui.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-6 py-6 md:grid-cols-2 md:px-8">
          <div className="rounded-2xl border border-border bg-background p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Form
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {formName?.trim() || 'Unnamed form'}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Status description
            </p>
            <p className="mt-2 text-sm text-foreground">
              {status?.description?.trim() ||
                'This form is not accepting submissions right now.'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-sm text-muted-foreground">
            If you believe this is unexpected, please contact the form owner.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUnavailableState;
