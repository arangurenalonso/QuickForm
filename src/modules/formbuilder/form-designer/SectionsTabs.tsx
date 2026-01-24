'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { Button } from '@/common/libs/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/common/libs/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/common/libs/utils';

const SectionsTabs = () => {
  const {
    sections,
    activeSectionId,
    setActiveSection,
    addSection,
    removeSection,
    renameSection,
  } = useDesigner();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sectionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of sections) map.set(s.id, s.title);
    return map;
  }, [sections]);

  // Entra a modo edición
  const startEditing = (sectionId: string) => {
    const currentTitle = sectionMap.get(sectionId) ?? '';
    setEditingId(sectionId);
    setDraftTitle(currentTitle);
  };

  // Guardar
  const commit = () => {
    if (!editingId) return;

    const original = sectionMap.get(editingId) ?? '';
    const next = draftTitle.trim();

    // si vacío, vuelve al original
    const finalTitle = next.length ? next : original;

    if (finalTitle !== original) {
      renameSection(editingId, finalTitle);
    }

    setEditingId(null);
  };

  // Cancelar
  const cancel = () => {
    setEditingId(null);
    setDraftTitle('');
  };

  // Autofocus cuando editas
  useEffect(() => {
    if (editingId) {
      // microtask para que exista en DOM
      queueMicrotask(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [editingId]);

  return (
    <div className="w-full flex items-center gap-2 border-b bg-background px-2 py-2">
      <Tabs value={activeSectionId} onValueChange={setActiveSection}>
        <TabsList className="flex flex-wrap gap-1">
          {sections.map((section) => {
            const isEditing = editingId === section.id;

            return (
              <div key={section.id} className="flex items-center gap-1">
                <TabsTrigger
                  value={section.id}
                  className={cn('max-w-[220px] truncate', isEditing && 'p-0')}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    startEditing(section.id);
                  }}
                >
                  {!isEditing ? (
                    <span className="truncate">{section.title}</span>
                  ) : (
                    <input
                      ref={inputRef}
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      onClick={(e) => {
                        // que no cambie de tab mientras editas
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          commit();
                        }
                        if (e.key === 'Escape') {
                          e.preventDefault();
                          cancel();
                        }
                      }}
                      onBlur={() => commit()}
                      className="
                        h-9 w-[220px] max-w-[220px]
                        rounded-md border bg-background px-2 text-sm
                        outline-none
                      "
                      aria-label="Rename section"
                    />
                  )}
                </TabsTrigger>

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
            );
          })}
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
  );
};

export default SectionsTabs;
