'use client';

import React from 'react';
import { cn } from '@/common/libs/utils';
import { NumericFormat } from 'react-number-format';
import { Input } from '@/common/libs/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/common/libs/ui/tooltip';
import { Info, AlertCircle } from 'lucide-react';
import DecimalFieldEditableProps from './type/decimal/DecimalFieldEditableProps';

interface NumberFieldComponentProps {
  inputRef?: React.Ref<HTMLInputElement>;
  value?: number;
  onChange?: (value?: number) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  error?: boolean;
  errorMessage?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
}

const NumberFieldComponent: React.FC<
  NumberFieldComponentProps & DecimalFieldEditableProps
> = ({
  label,
  value,
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
  prefix,
  suffix,
  decimalScale = 2,
  allowNegative = true,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      {(label || informationText) && (
        <div className="flex items-center gap-2">
          {label && (
            <label
              htmlFor={name}
              className={cn(
                'text-sm font-medium',
                error ? 'text-destructive' : 'text-foreground'
              )}
            >
              {label}

              {required && (
                <span
                  className={cn(
                    'ml-1',
                    error ? 'text-destructive' : 'text-muted-foreground'
                  )}
                  aria-hidden="true"
                >
                  *
                </span>
              )}
            </label>
          )}

          {informationText && (
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      'text-muted-foreground hover:text-foreground',
                      error && 'text-destructive hover:text-destructive'
                    )}
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
          />
        )}

        <NumericFormat
          id={name}
          name={name}
          value={value}
          onValueChange={(values) => onChange?.(values.floatValue)}
          onBlur={onBlur}
          placeholder={placeholder}
          prefix={prefix}
          suffix={suffix}
          allowNegative={allowNegative}
          decimalScale={decimalScale}
          fixedDecimalScale
          thousandSeparator=","
          disabled={disabled}
          getInputRef={inputRef}
          customInput={Input}
          className={cn(
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

export default NumberFieldComponent;
