'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';
import { Button } from '@/common/libs/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/common/libs/ui/tabs';
import { Plus, Trash2, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/libs/ui/dialog';
import { Input } from '@/common/libs/ui/input';
import { Textarea } from '@/common/libs/ui/textarea';
import { cn } from '@/common/libs/utils';

const SCROLL_STEP = 260;

const SectionsTabs = () => {
  const {
    sections,
    activeSectionId,
    setActiveSection,
    addSection,
    removeSection,
    updateSectionMeta,
  } = useDesigner();

  const [open, setOpen] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDescription, setDraftDescription] = useState('');

  const sectionMap = useMemo(() => {
    const map = new Map<string, { title: string; description?: string }>();
    for (const s of sections)
      map.set(s.id, { title: s.title, description: s.description });
    return map;
  }, [sections]);

  const openEditModal = (sectionId: string) => {
    const current = sectionMap.get(sectionId);
    setEditingSectionId(sectionId);
    setDraftTitle(current?.title ?? '');
    setDraftDescription(current?.description ?? '');
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditingSectionId(null);
  };

  const save = () => {
    if (!editingSectionId) return;

    updateSectionMeta(editingSectionId, {
      title: draftTitle.trim() || 'Untitled section',
      description: draftDescription.trim(),
    });

    closeModal();
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
  }, [sections.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateScrollState();
    el.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollByAmount = (amount: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <>
      <div className="w-full min-w-0 flex items-center gap-2 border-b bg-background px-2 py-2 overflow-hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            'h-9 w-9 shrink-0',
            !canScrollLeft && 'opacity-40 pointer-events-none'
          )}
          onClick={() => scrollByAmount(-SCROLL_STEP)}
          aria-label="Scroll left"
          title="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Tabs area */}
        <div className="flex-1 min-w-0">
          <Tabs value={activeSectionId} onValueChange={setActiveSection}>
            <div
              ref={scrollRef}
              className={cn(
                'min-w-0 overflow-x-auto overflow-y-hidden whitespace-nowrap',
                'scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]'
              )}
            >
              <TabsList className="inline-flex gap-1 bg-transparent p-0 min-w-0">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="inline-flex items-center gap-1"
                  >
                    <TabsTrigger
                      value={section.id}
                      className="max-w-[220px] truncate"
                    >
                      <span className="truncate">{section.title}</span>
                    </TabsTrigger>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEditModal(section.id);
                      }}
                      aria-label="Edit section"
                      title="Edit section"
                    >
                      <Pencil className="h-4 w-4 text-yellow-500 " />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeSection(section.id);
                      }}
                      disabled={sections.length === 1}
                      title={
                        sections.length === 1
                          ? 'You need at least 1 section'
                          : 'Delete section'
                      }
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Right scroll */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            'h-9 w-9 shrink-0',
            !canScrollRight && 'opacity-40 pointer-events-none'
          )}
          onClick={() => scrollByAmount(SCROLL_STEP)}
          aria-label="Scroll right"
          title="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Add section */}
        <Button
          type="button"
          variant="outline"
          className="gap-2 shrink-0"
          onClick={() => addSection(`Section ${sections.length + 1}`)}
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Modal */}
      <Dialog
        open={open}
        onOpenChange={(v) => (v ? setOpen(true) : closeModal())}
      >
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Edit section</DialogTitle>
            <DialogDescription>
              Update the section title and description.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="e.g. Personal info"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={draftDescription}
                onChange={(e) => setDraftDescription(e.target.value)}
                placeholder="Optional description for this section..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SectionsTabs;
