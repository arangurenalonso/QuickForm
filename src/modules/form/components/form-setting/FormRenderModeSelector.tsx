'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/common/libs/utils';
import { RenderMode, TypesRender } from '../../types/form.types';
import { getRenderModeIcon } from '../../utils/form.method';

type FormRenderModeSelectorProps = {
  renderMode?: RenderMode;
  disabled?: boolean;
  onChange?: (value: TypesRender) => void;
  options: TypesRender[];
};

const FormRenderModeSelector = ({
  renderMode,
  disabled = false,
  onChange,
  options,
}: FormRenderModeSelectorProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {options.map((option) => {
        const selected = option.id === renderMode?.id;
        const Icon = getRenderModeIcon(option.icon);

        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(option)}
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
                    {option.keyName}
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
