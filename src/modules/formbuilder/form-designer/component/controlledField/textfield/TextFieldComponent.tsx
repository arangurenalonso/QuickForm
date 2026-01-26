'use client';

import React from 'react';
import { Input } from '@/common/libs/ui/input';
import { cn } from '@/common/libs/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/common/libs/ui/tooltip';
import { Info, AlertCircle } from 'lucide-react';
import TextFieldEditableProps from './type/TextFieldEditableProps';

interface TextFieldComponentProps {
  inputRef?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange?: (value?: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  error?: boolean;
  errorMessage?: React.ReactNode;
  disabled?: boolean;
}

const TextFieldComponent: React.FC<
  TextFieldComponentProps & TextFieldEditableProps
> = ({
  label,
  value = '',
  onChange,
  onBlur,
  name,
  placeholder,
  error = false,
  errorMessage,
  disabled = false,
  inputRef,
  icon: Icon,
  helperText,
  informationText,
}) => {
  return (
    <div className="space-y-2">
      {/* Label row + info tooltip */}
      {(label || informationText) && (
        <div className="flex items-center gap-2">
          {label && (
            <label htmlFor={name} className="text-sm font-medium leading-none">
              {label}
            </label>
          )}

          {informationText && (
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={(e) => e.preventDefault()}
                    aria-label="Information"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[280px] text-sm">
                  {informationText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}

      {/* Control */}
      <div
        className={cn(
          'flex items-center gap-2 rounded-md border bg-background px-3 py-2',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          error
            ? 'border-destructive focus-within:ring-destructive'
            : 'border-input',
          disabled && 'opacity-60 cursor-not-allowed'
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              'h-5 w-5 text-muted-foreground',
              error && 'text-destructive'
            )}
            size={20}
          />
        )}

        <Input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          ref={inputRef}
          className={cn(
            // ✅ evita doble borde y mantiene estética shadcn
            'h-auto border-0 p-0 shadow-none focus-visible:ring-0',
            'flex-1 bg-transparent placeholder:text-muted-foreground',
            disabled && 'pointer-events-none'
          )}
        />
      </div>
      <p
        className={cn(
          'min-h-[1rem] text-xs',
          error
            ? 'flex items-center gap-2 text-destructive'
            : 'text-muted-foreground'
        )}
      >
        {error ? (
          <>
            <AlertCircle className="h-4 w-4" /> {errorMessage}
          </>
        ) : (
          helperText || '\u00A0'
        )}
      </p>
    </div>
  );
};

export default TextFieldComponent;
