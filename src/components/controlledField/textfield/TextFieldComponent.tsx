'use client';
import React from 'react';
import { Input } from '@/components/ui/input'; // Ajusta la ruta según tu estructura de Shadcn
import { cn } from '@/lib/utils'; // Si usas una utilidad de concatenación de clases
import { FiAlertCircle } from 'react-icons/fi'; // Ícono por defecto de React Icons
import { Label } from '@/components/ui/label';
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
      {/* Label */}
      {label && (
        <>
          <Label htmlFor={name} className="text-sm font-medium ">
            {label}
            {informationText && (
              <p className="text-xs text-muted-foreground ">
                {informationText}
              </p>
            )}
          </Label>
        </>
      )}

      {/* Input Container */}
      <div
        className={cn(
          'flex items-center border rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primary',
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

        {/* Input */}
        <Input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          ref={inputRef}
          className="flex-1 bg-transparent placeholder:text-muted-foreground"
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

export default TextFieldComponent;
