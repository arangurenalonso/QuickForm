'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/common/libs/ui/sheet';
import { useBoundStore } from '@/store';
import { cn } from '@/common/libs/utils';

const DrawerHost = () => {
  const drawers = useBoundStore((s) => s.drawers);
  const closeDrawer = useBoundStore((s) => s.closeDrawer);

  if (!drawers?.length) return null;

  return (
    <>
      {drawers.map((drawer) => (
        <Sheet
          key={drawer.id}
          modal={drawer.showOverlay ?? true}
          open={drawer.isOpen !== false}
          onOpenChange={(next) => {
            if (!next) closeDrawer(drawer.id);
          }}
        >
          <SheetContent
            side={drawer.side ?? 'right'}
            className={cn('w-[320px] max-w-[90vw] p-0', drawer.className)}
          >
            <div className="grid h-full grid-rows-[auto_1fr_auto]">
              <SheetHeader className="border-b px-6 py-4 text-left">
                <SheetTitle>{drawer.title}</SheetTitle>

                {drawer.titleDescription && (
                  <SheetDescription>{drawer.titleDescription}</SheetDescription>
                )}
              </SheetHeader>

              <div className="min-h-0 overflow-y-auto p-4">
                {drawer.content}
              </div>

              {drawer.actions && (
                <div className="border-t px-4 py-3">{drawer.actions}</div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </>
  );
};

export default DrawerHost;
