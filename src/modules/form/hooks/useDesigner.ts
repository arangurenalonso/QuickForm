'use client';

import { useMemo } from 'react';
import { useBoundStore } from '@/store';

export default function useDesigner() {
  const setActiveSection = useBoundStore((state) => state.setActiveSection);
  const addSection = useBoundStore((state) => state.addSection);
  const removeSection = useBoundStore((state) => state.removeSection);
  const updateSectionMeta = useBoundStore((state) => state.updateSectionMeta);
  const handleSelectedField = useBoundStore(
    (state) => state.handleSelectedField
  );
  const addElement = useBoundStore((state) => state.addElement);
  const removeField = useBoundStore((state) => state.removeField);
  const updateField = useBoundStore((state) => state.updateField);
  const reorderFieldInSection = useBoundStore(
    (state) => state.reorderFieldInSection
  );
  const setFormStructure = useBoundStore((state) => state.setFormStructure);
  const resetDesigner = useBoundStore((state) => state.resetDesigner);
  const sections = useBoundStore((state) => state.sections);
  const activeSectionId = useBoundStore((state) => state.activeSectionId);
  const selectedField = useBoundStore((state) => state.selectedField);

  return useMemo(
    () => ({
      // Sections Management
      setActiveSection,
      addSection,
      removeSection,
      updateSectionMeta,
      // Fields Management
      handleSelectedField,
      addElement,
      removeField,
      updateField,
      reorderFieldInSection,
      setFormStructure,
      resetDesigner,
      // State
      sections,
      activeSectionId,
      selectedField,
    }),
    [
      setActiveSection,
      addSection,
      removeSection,
      updateSectionMeta,
      handleSelectedField,
      addElement,
      removeField,
      updateField,
      reorderFieldInSection,
      setFormStructure,
      resetDesigner,
      sections,
      activeSectionId,
      selectedField,
    ]
  );
}
