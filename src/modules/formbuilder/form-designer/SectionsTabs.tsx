'use client';

import React, { useMemo, useState } from 'react';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { Button } from '@/common/libs/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/common/libs/ui/tabs';
import { Plus, Trash2, Pencil } from 'lucide-react';
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

  return (
    <>
      <div className="w-full flex items-center gap-2 border-b bg-background px-2 py-2">
        <Tabs value={activeSectionId} onValueChange={setActiveSection}>
          <TabsList className="flex flex-wrap gap-1">
            {sections.map((section) => (
              <div key={section.id} className="flex items-center gap-1 group">
                <div className="relative">
                  <TabsTrigger
                    value={section.id}
                    className="max-w-[220px] truncate pr-10"
                  >
                    <span className="truncate">{section.title}</span>
                  </TabsTrigger>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openEditModal(section.id);
                  }}
                  aria-label="Edit section"
                  title="Edit section"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
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
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </TabsList>
        </Tabs>

        <Button
          type="button"
          variant="outline"
          className="gap-2"
          onClick={() => addSection(`Section ${sections.length + 1}`)}
        >
          <Plus className="h-4 w-4" />
          Add section
        </Button>
      </div>

      {/* ✅ Modal */}
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
