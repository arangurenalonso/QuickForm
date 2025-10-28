// components/text-with-link.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/common/libs/utils';

type TextWithLinkProps = {
  linkText: string;
  href: string;
  prefetch?: boolean;
  className?: string;
  /** If true: underline by default, remove on hover. If false: no underline by default, show on hover. */
  invertUnderline?: boolean;
};

export function CustomLink({
  href,
  linkText,
  prefetch,
  className,
  invertUnderline = true, // keep your previous behavior as default
}: TextWithLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      aria-label={linkText}
      className={cn(
        'font-semibold text-primary underline-offset-4 decoration-2',
        invertUnderline
          ? 'underline hover:no-underline'
          : 'no-underline hover:underline',
        className
      )}
    >
      {linkText}
    </Link>
  );
}
