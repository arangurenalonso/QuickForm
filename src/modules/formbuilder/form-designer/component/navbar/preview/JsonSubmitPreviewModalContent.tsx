'use client';

import React from 'react';
import { Button } from '@/common/libs/ui/button';
import { Badge } from '@/common/libs/ui/badge';
import { useBoundStore } from '@/store';
import JsonViewer from './JsonViewer';

type Props = {
  modalId: string;
  payload: unknown;
};

export default function JsonSubmitPreviewModalContent({
  modalId,
  payload,
}: Props) {
  const closeModal = useBoundStore((s) => s.closeModal);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-start gap-3">
        <Badge variant="secondary">Submit Preview</Badge>
        <Badge variant="outline">JSON</Badge>
      </div>

      <JsonViewer
        value={payload}
        title="Request body"
        maxHeightClassName="h-[32vh]"
      />

      <div className="flex items-center justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={() => closeModal(modalId)}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
