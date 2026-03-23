// src/modules/form/components/form-settings/FormRenderModeSelector.tsx
'use client';

import React from 'react';
import {
  Check,
  LayoutTemplate,
  PanelsTopLeft,
  Rows3,
  ListOrdered,
} from 'lucide-react';
import { cn } from '@/common/libs/utils';
import { FormRenderMode } from '../form-render/type/form-rende.type';

type FormRenderModeSelectorProps = {
  value?: FormRenderMode;
  disabled?: boolean;
  onChange?: (value: FormRenderMode) => void;
};

const options: Array<{
  value: FormRenderMode;
  title: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    value: 'default',
    title: 'Default',
    description: 'A classic stacked layout with all sections shown naturally.',
    icon: LayoutTemplate,
  },
  {
    value: 'tabs',
    title: 'Tabs',
    description: 'Best when users need to jump between sections quickly.',
    icon: PanelsTopLeft,
  },
  {
    value: 'accordion',
    title: 'Accordion',
    description: 'Compact and clean for forms with many sections.',
    icon: Rows3,
  },
  {
    value: 'stepper',
    title: 'Stepper',
    description: 'Guided flow for longer forms and better completion.',
    icon: ListOrdered,
  },
];

const FormRenderModeSelector = ({
  value = 'default',
  disabled = false,
  onChange,
}: FormRenderModeSelectorProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {options.map((option) => {
        const selected = option.value === value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(option.value)}
            className={cn(
              'qf-grid-card relative p-0 text-left',
              'disabled:cursor-not-allowed disabled:opacity-60',
              selected && 'ring-2 ring-ring border-ring bg-accent/30'
            )}
          >
            <div className="flex items-start gap-4 p-5">
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-background text-muted-foreground transition-colors',
                  selected &&
                    'bg-primary text-primary-foreground border-primary'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {option.title}
                  </p>

                  {selected && <span className="qf-badge-info">Selected</span>}
                </div>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {option.description}
                </p>
              </div>

              <div
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-transparent'
                )}
              >
                <Check className="h-3.5 w-3.5" />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default FormRenderModeSelector;
