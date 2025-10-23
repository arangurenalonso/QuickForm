// components/text-with-link.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';

type TextWithLinkProps = {
  linkText: string;
  href: string;
  prefetch?: boolean;
};

export function CustomLink({ href, linkText, prefetch }: TextWithLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="font-semibold text-primary hover:underline"
      aria-label={linkText}
    >
      {linkText}
    </Link>
  );
}
