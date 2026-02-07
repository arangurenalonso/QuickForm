import { FieldErrors } from 'react-hook-form';

export const isPlainObject = (x: unknown): x is Record<string, unknown> => {
  return (
    typeof x === 'object' &&
    x !== null &&
    (x.constructor === Object || Object.getPrototypeOf(x) === Object.prototype)
  );
};

export const containsFieldError = (value: unknown): boolean => {
  if (!value) return false;

  if (
    typeof value === 'object' &&
    value !== null &&
    ('type' in value || 'message' in value)
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.some(containsFieldError);
  }

  if (isPlainObject(value)) {
    return Object.values(value).some(containsFieldError);
  }

  return false;
};

export const hasError = (errors: FieldErrors, fieldName: string) => {
  const value = errors[fieldName];

  const result = containsFieldError(value);

  return result;
};
