import { SectionType } from './designer-context.type';

export const createSection = (title?: string): SectionType => {
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
