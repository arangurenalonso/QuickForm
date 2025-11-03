'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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

            <DialogFooter className="sm:justify-end gap-2">
              {m.actions ?? (
                <Button variant="secondary" onClick={() => closeModal(m.id)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
}
