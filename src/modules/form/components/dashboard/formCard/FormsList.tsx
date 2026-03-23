'use client';

import React from 'react';
import {
  FileText,
  Eye,
  Pencil,
  Send,
  MoreHorizontal,
  ClipboardList,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import { cn } from '@/common/libs/utils';
import { FormType } from '@/modules/form/types/form.types';

type FormListItemType = {
  id: string;
  name: string;
  submissionsCount: number;
  lastEditedAt: string;
  status?: 'draft' | 'published';
  kind?: 'default' | 'registration' | 'order';
};

type FormsListProps = {
  forms: FormType[];
  selectedId?: string;
  onView?: (formId: string) => void;
  onEdit?: (formId: string) => void;
  onPublish?: (formId: string) => void;
  onMore?: (formId: string) => void;
};

const getFormIcon = (kind?: FormListItemType['kind']) => {
  switch (kind) {
    case 'registration':
      return ClipboardList;
    case 'order':
      return ShoppingBag;
    default:
      return FileText;
  }
};

const getFormIconStyles = (status?: FormListItemType['status']) => {
  if (status === 'published') {
    return 'bg-success text-success-foreground';
  }

  return 'bg-warning text-warning-foreground';
};

const formatMeta = (submissionsCount: number, lastEditedAt: string) => {
  const submissionLabel =
    submissionsCount === 1 ? '1 submission' : `${submissionsCount} submissions`;

  return `${submissionLabel} · Last edited on ${lastEditedAt}`;
};

const FormsList = ({
  forms,
  selectedId,
  onView,
  onEdit,
  onPublish,
  onMore,
}: FormsListProps) => {
  if (!forms.length) {
    return (
      <div className="qf-surface flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <FileText className="h-6 w-6" />
        </div>

        <h3 className="text-base font-semibold text-foreground">
          No forms yet
        </h3>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          Once you create forms, they will appear here with their status,
          submissions, and quick actions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {forms.map((form) => {
        const Icon = getFormIcon(form.kind);
        const isSelected = selectedId === form.id;

        return (
          <div
            key={form.id}
            className={cn(
              'group qf-surface flex items-center gap-4 px-4 py-4 transition-all',
              'hover:border-primary/30 hover:shadow-qf-sm',
              isSelected && 'border-primary ring-1 ring-primary/20'
            )}
          >
            {/* <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm',
                getFormIconStyles(form.status)
              )}
            >
              <Icon className="h-5 w-5" />
            </div> */}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-lg font-semibold text-foreground">
                  {form.name}
                </h3>

                {form.status === 'draft' && (
                  <span className="qf-badge-warning">Draft</span>
                )}

                {form.status === 'published' && (
                  <span className="qf-badge-success">Published</span>
                )}
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {formatMeta(form.submissionsCount, form.lastEditedAt)}
              </p>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="qf-action-btn"
                onClick={() => onView?.(form.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                size="icon"
                variant="outline"
                className="qf-action-btn qf-action-btn-warning"
                onClick={() => onEdit?.(form.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                size="icon"
                variant="outline"
                className="qf-action-btn"
                onClick={() => onPublish?.(form.id)}
              >
                <Send className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                size="icon"
                variant="outline"
                className="qf-action-btn"
                onClick={() => onMore?.(form.id)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="md:hidden">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="qf-action-btn"
                onClick={() => onMore?.(form.id)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormsList;
