'use client';
import React from 'react';
import { cn } from '@/common/libs/utils';
import { FiAlertCircle } from 'react-icons/fi';
import { Label } from '@/common/libs/ui/label';
import { NumericFormat } from 'react-number-format';
import { Input } from '@/common/libs/ui/input';
import NumberFieldEditableProps from './type/NumberFieldEditableProps';
interface NumberFieldComponentProps {
  inputRef?: React.Ref<HTMLInputElement>;
  value?: number;
  onChange?: (value?: number) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  error?: boolean;
  errorMessage?: React.ReactNode;
  disabled?: boolean;
}

const NumberFieldComponent: React.FC<
  NumberFieldComponentProps & NumberFieldEditableProps
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
}) => {
  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
          {informationText && (
            <span className="ml-2 text-xs text-muted-foreground">
              {informationText}
            </span>
          )}
        </Label>
      )}

      {/* Input Container */}
      <div
        className={cn(
          'flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary',
          error
            ? 'border-destructive focus-within:ring-destructive'
            : 'border-input',
          disabled ? 'bg-muted pointer-events-none opacity-50' : ''
        )}
      >
        {/* Icon */}
        {Icon && (
          <Icon
            className={cn(
              'mr-2 text-muted-foreground',
              error ? 'text-destructive' : ''
            )}
            size={20}
          />
        )}

        {/* Number Input */}
        <NumericFormat
          id={name}
          name={name}
          value={value}
          onValueChange={(values) => {
            if (onChange) {
              onChange(values.floatValue);
            }
          }}
          onBlur={onBlur}
          placeholder={placeholder}
          prefix={prefix}
          disabled={disabled}
          getInputRef={inputRef}
          className="flex-1 bg-transparent placeholder:text-muted-foreground"
          allowNegative={allowNegative}
          decimalScale={decimalScale}
          fixedDecimalScale
          suffix={suffix}
          thousandSeparator=","
          customInput={Input}
        />
      </div>

      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}

      {/* Error Message */}
      {error && errorMessage && (
        <p className="flex items-center text-xs text-destructive">
          <FiAlertCircle className="mr-1" size={16} />
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default NumberFieldComponent;
