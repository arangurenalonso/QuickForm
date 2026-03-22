import { DesignerState, SectionType } from './designer.model';

const createSectionId = (): string => {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `section_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const createDesignerSection = (title?: string): SectionType => {
  return {
    id: createSectionId(),
    title: title?.trim() || 'New section',
    description: '',
    fields: [],
  };
};

const firstSection = createDesignerSection('Section 1');

export const designerInitialState: DesignerState = {
  sections: [firstSection],
  activeSectionId: firstSection.id,
  selectedField: null,
};
