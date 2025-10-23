// components/ui/helper-text.tsx
import * as React from 'react';
import { Info, CheckCircle2, AlertTriangle, CircleX } from 'lucide-react';
import { cn } from '@/common/libs/utils';

export type HelperTextVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
export type HelperTextSize = 'sm' | 'md';

export interface HelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Optional id to pair with aria-describedby on inputs */
  id?: string;
  /** Visual style and semantics */
  variant?: HelperTextVariant;
  /** Size of the helper text */
  size?: HelperTextSize;
  /** Icon element, or set to true to use the default icon for the variant */
  icon?: React.ReactNode | boolean;
}

/**
 * HelperText — tiny, accessible inline guidance for form fields.
 * - Pairs with `aria-describedby` on the input.
 * - Uses role/aria-live for error vs. non-error messaging.
 * - Works with shadcn/ui + Tailwind.
 */
const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  (
    {
      id,
      className,
      children,
      variant = 'default',
      size = 'sm',
      icon,
      ...props
    },
    ref
  ) => {
    const base = 'mt-1 flex items-start gap-1.5';

    const sizeCls =
      size === 'md' ? 'text-sm leading-snug' : 'text-xs leading-snug';

    const colorCls =
      variant === 'error'
        ? 'text-destructive'
        : variant === 'warning'
        ? 'text-amber-600 dark:text-amber-400'
        : variant === 'success'
        ? 'text-green-600 dark:text-green-400'
        : variant === 'info'
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-muted-foreground';

    const IconByVariant: Record<
      Exclude<HelperTextVariant, 'default'>,
      React.ReactNode
    > = {
      info: <Info className="h-4 w-4 shrink-0" aria-hidden />,
      success: <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />,
      warning: <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />,
      error: <CircleX className="h-4 w-4 shrink-0" aria-hidden />,
    };

    const computedIcon =
      icon === true
        ? variant !== 'default'
          ? IconByVariant[variant]
          : null
        : icon ?? null;

    // Accessibility: errors should interrupt (assertive), others are polite
    const ariaLive = variant === 'error' ? 'assertive' : 'polite';
    const role = variant === 'error' ? 'alert' : undefined;

    return (
      <p
        id={id}
        ref={ref}
        role={role}
        aria-live={ariaLive}
        className={cn(base, sizeCls, colorCls, className)}
        {...props}
      >
        {computedIcon}
        <span>{children}</span>
      </p>
    );
  }
);
HelperText.displayName = 'HelperText';

export default HelperText;
