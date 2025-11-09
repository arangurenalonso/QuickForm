'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/libs/ui/dialog';
import { useBoundStore } from '@/store';

export default function ModalHost() {
  const modals = useBoundStore((s) => s.modals);
  const closeModal = useBoundStore((s) => s.closeModal);

  if (!modals?.length) return null;

  return (
    <>
      {modals.map((m) => (
        <Dialog
          key={m.id}
          open={m.isOpen !== false}
          onOpenChange={(next) => {
            if (!next) closeModal(m.id);
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{m.title}</DialogTitle>
              {m.titleDescription && (
                <DialogDescription>{m.titleDescription}</DialogDescription>
              )}
            </DialogHeader>

            <div className="space-y-3">{m.content}</div>

            {m.actions ?? (
              <DialogFooter className="sm:justify-end gap-2">
                {m.actions}
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
}
