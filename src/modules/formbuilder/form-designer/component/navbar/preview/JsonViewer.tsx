'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@/common/libs/ui/button';
import { ScrollArea } from '@/common/libs/ui/scroll-area';
import { Separator } from '@/common/libs/ui/separator';
import { Check, Copy } from 'lucide-react';

type JsonViewerProps = {
  value: unknown;
  title?: string;
  maxHeightClassName?: string; // ej: "h-[60vh]"
};

export default function JsonViewer({
  value,
  title = 'Payload',
  maxHeightClassName = 'h-[55vh]',
}: JsonViewerProps) {
  const [copied, setCopied] = useState(false);

  const pretty = useMemo(() => JSON.stringify(value, null, 2), [value]);

  const copy = async () => {
    await navigator.clipboard.writeText(pretty);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">
            This is the JSON that will be sent.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={copy}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      <Separator />

      <div className={`rounded-md border bg-muted/40 ${maxHeightClassName}`}>
        <ScrollArea className="h-full w-full">
          <pre className="p-4 text-xs leading-relaxed overflow-x-auto">
            {pretty}
          </pre>
        </ScrollArea>
      </div>
    </div>
  );
}
