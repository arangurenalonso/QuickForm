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

  //   const { modals, closeModal } = useBoundStore.getState();
  console.log('modals', { modals });

  if (!modals?.length) return null;

  return (
    <>
      {modals.map((m) => (
        <Dialog
          key={m.id}
          open={m.isOpen !== false}
          onOpenChange={(next) => {
            if (!next && m.acceptToClose === false) return;
            if (!next) closeModal(m.id);
          }}
        >
          <DialogContent
            onInteractOutside={(e) => {
              if (m.acceptToClose === false) e.preventDefault();
            }}
            onEscapeKeyDown={(e) => {
              if (m.acceptToClose === false) e.preventDefault();
            }}
            className="sm:max-w-md"
          >
            <DialogHeader>
              <DialogTitle>{m.title}</DialogTitle>
              <DialogDescription className="sr-only">
                Ventana modal
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">{m.content}</div>

            <DialogFooter className="sm:justify-end gap-2">
              {m.actions ?? (
                <Button variant="secondary" onClick={() => closeModal(m.id)}>
                  Cerrar
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
}
