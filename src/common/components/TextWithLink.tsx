// components/text-with-link.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/common/libs/ui/button';
import { cn } from '@/common/libs/utils';
import { CustomLink } from './atoms/CustomLink';

type TextWithLinkProps = {
  mainText: React.ReactNode;
  linkText: string;
  href: string;
  asButton?: boolean; // render as shadcn button
  prefetch?: boolean; // control Next prefetching (default true)
  className?: string;
  invertUnderline?: boolean; // pass to CustomLink
};

const TextWithLink = ({
  mainText,
  linkText,
  href,
  asButton = false,
  prefetch = true,
  className,
  invertUnderline = false,
}: TextWithLinkProps) => {
  return (
    <p className={cn('text-center text-muted-foreground', className)}>
      {mainText}{' '}
      {asButton ? (
        <Button asChild className="font-semibold">
          <Link href={href} prefetch={prefetch} aria-label={linkText}>
            {linkText}
          </Link>
        </Button>
      ) : (
        <CustomLink
          href={href}
          prefetch={prefetch}
          linkText={linkText}
          invertUnderline={invertUnderline}
        />
      )}
    </p>
  );
};
export default TextWithLink;
