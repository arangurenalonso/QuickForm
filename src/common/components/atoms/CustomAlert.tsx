import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/common/libs/ui/alert';
import {
  Info,
  CheckCircle2,
  TriangleAlert,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Variante = 'info' | 'success' | 'warning' | 'error' | 'default';

const ICONS_BY_VARIANT: Record<Variante, LucideIcon> = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
};

type CustomAlertProps = {
  title?: string;
  message?: string;
  variant?: Variante;
  icon?: LucideIcon;
  iconClassName?: string;
  hideIcon?: boolean;
  redirectUrl?: string;
  openInNewTab?: boolean;
  // autoRedirectAfterMs?: number;
};

const CustomAlert = ({
  title,
  message,
  variant = 'info',
  icon,
  iconClassName = '',
  hideIcon = false,
  redirectUrl,
  openInNewTab = false,
}: // autoRedirectAfterMs,
CustomAlertProps) => {
  //   useEffect(() => {
  //   if (autoRedirectAfterMs && redirectUrl) {
  //     const id = setTimeout(() => {
  //       window.location.assign(redirectUrl);
  //     }, autoRedirectAfterMs);
  //     return () => clearTimeout(id);
  //   }
  // }, [autoRedirectAfterMs, redirectUrl]);

  const Icon = icon ?? ICONS_BY_VARIANT[variant];

  const gridCols = redirectUrl
    ? 'grid-cols-[auto,1fr,auto]'
    : 'grid-cols-[1fr,auto]';

  return (
    <Alert variant={variant} className="m-0 p-0">
      <div className={`grid ${gridCols} items-center gap-3 p-4`}>
        {!hideIcon && Icon && (
          <span className="inline-flex h-6 w-6 items-center justify-center">
            <Icon className={`h-5 w-5 ${iconClassName}`} aria-hidden="true" />
          </span>
        )}

        <div className="min-w-0">
          {title ? <AlertTitle className="mb-1">{title}</AlertTitle> : null}
          <AlertDescription className="break-words">
            {message || 'We could not verify your email. Please try again.'}
          </AlertDescription>
        </div>

        {redirectUrl && (
          <Link
            href={redirectUrl}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
            aria-label="Open link"
            className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted justify-self-end"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </Alert>
  );
};

export default CustomAlert;
