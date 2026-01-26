'use client';

import { useMemo, useState, useEffect, ReactNode } from 'react';
import { DesignerContext } from './DesignerContext';
import { SectionType, SelectedFieldType } from './designer-context.type';
import { arrayMove } from '@dnd-kit/sortable';
import { UpdatedTypeEnum } from '../component/controlledField/common/enum/FieldType';
import { FormFieldConfigType } from '../component/controlledField/common/enum/FormFieldConfigType';

const createSection = (title?: string): SectionType => {
  // id simple; ideal: crypto.randomUUID() si lo tienes disponible
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `section_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  return {
    id,
    title: title?.trim() || 'New section',
    description: '',
    fields: [],
  };
};

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sections, setSections] = useState<SectionType[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    if (sections.length === 0) {
      addSection('Section 1');
    }
  }, []);

  const [selectedField, setSelectedField] = useState<SelectedFieldType>(null);

  const setActiveSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setSelectedField(null);
  };

  const addSection = (title?: string) => {
    const newSection = createSection(title);

    setSections((prev) => [...prev, newSection]);
    setActiveSectionId(newSection.id);
    setSelectedField(null);
  };

  const removeSection = (sectionId: string) => {
    setSections((prev) => {
      const next = prev.filter((s) => s.id !== sectionId);

      if (next.length === 0) {
        const fallback = createSection('Section 1');
        setActiveSectionId(fallback.id);
        setSelectedField(null);
        return [fallback];
      }

      if (activeSectionId === sectionId) {
        setActiveSectionId(next[0].id);
        setSelectedField(null);
      }

      setSelectedField((prevSel) => {
        if (!prevSel) return null;
        return prevSel.sectionId === sectionId ? null : prevSel;
      });

      return next;
    });
  };

  const updateSectionMeta = (
    sectionId: string,
    payload: { title?: string; description?: string }
  ) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              title: payload.title ?? s.title,
              description: payload.description ?? s.description,
            }
          : s
      )
    );
  };

  const handleSelectedField = (payload: SelectedFieldType) => {
    setSelectedField(payload);
  };

  const addElement = (
    sectionId: string,
    index: number,
    element: FormFieldConfigType
  ) => {
    console.log(
      'Adding element to section:',
      sectionId,
      'at index:',
      index,
      element
    );
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId) return s;

        const nextFields = [...s.fields];
        const safeIndex = Math.max(0, Math.min(index, nextFields.length));
        nextFields.splice(safeIndex, 0, element);

        return { ...s, fields: nextFields };
      })
    );
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId) return s;
        return { ...s, fields: s.fields.filter((f) => f.id !== fieldId) };
      })
    );

    setSelectedField((prevSel) => {
      if (!prevSel) return null;
      if (prevSel.sectionId === sectionId && prevSel.fieldId === fieldId)
        return null;
      return prevSel;
    });
  };

  const updateField = (
    updatedField: FormFieldConfigType,
    type: UpdatedTypeEnum
  ) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== activeSectionId) return s;
        const idx = s.fields.findIndex((f) => f.id === updatedField.id);

        if (idx === -1) return s;

        const nextFields = [...s.fields];

        if (type === UpdatedTypeEnum.EditableForm) {
          nextFields[idx] = {
            ...nextFields[idx],
            properties: updatedField.properties,
          };
        }

        if (type === UpdatedTypeEnum.RuleForm) {
          nextFields[idx] = {
            ...nextFields[idx],
            rules: updatedField.rules,
          };
        }

        return { ...s, fields: nextFields };
      })
    );
  };

  const reorderFieldInSection = (
    sectionId: string,
    activeFieldId: string,
    overFieldId: string
  ) => {
    if (activeFieldId === overFieldId) return;

    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId) return s;

        const oldIndex = s.fields.findIndex((f) => f.id === activeFieldId);
        const newIndex = s.fields.findIndex((f) => f.id === overFieldId);

        if (oldIndex === -1 || newIndex === -1) return s;
        if (oldIndex === newIndex) return s;

        return { ...s, fields: arrayMove(s.fields, oldIndex, newIndex) };
      })
    );
  };

  const value = useMemo(
    () => ({
      sections,
      activeSectionId,
      setActiveSection,
      addSection,
      removeSection,
      updateSectionMeta,

      selectedField,
      handleSelectedField,
      addElement,
      removeField,
      updateField,
      reorderFieldInSection,
    }),
    [sections, activeSectionId, selectedField]
  );

  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  );
}
