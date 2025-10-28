import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, CheckCircle2, TriangleAlert, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type CustomAlertProps = {
  title?: string;
  message?: string;
  variant?: Variante;
  icon?: LucideIcon;
  iconClassName?: string;
  hideIcon?: boolean;
};
type Variante = 'info' | 'success' | 'warning' | 'error' | 'default';

const ICONS_BY_VARIANT: Record<Variante, LucideIcon> = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle, // puedes usar TriangleAlert si prefieres
};

const CustomAlert = ({
  title,
  message,
  variant = 'info',
  icon,
  iconClassName = '',
  hideIcon = false,
}: CustomAlertProps) => {
  const Icon = icon ?? ICONS_BY_VARIANT[variant];

  return (
    <Alert variant={variant} className="mt-0">
      {!hideIcon && Icon ? (
        <Icon className={`h-5 w-5  ${iconClassName}`} />
      ) : null}

      {title ? <AlertTitle>{title}</AlertTitle> : null}

      <AlertDescription>
        {message || 'We could not verify your email. Please try again.'}
      </AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
