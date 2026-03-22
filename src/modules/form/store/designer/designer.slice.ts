import { arrayMove } from '@dnd-kit/sortable';
import { UpdatedTypeEnum } from '@/modules/form/components/controlledField/common/enum/FieldType';
import { DesignerState } from './designer.model';
import { DesignerAction } from './designer.action';
import {
  createDesignerSection,
  designerInitialState,
} from './designer.initial';
import { ImmerStateCreator } from '@/store/type';

export type DesignerSlice = DesignerState & DesignerAction;

export const createDesignerSlice: ImmerStateCreator<DesignerSlice> = (set) => ({
  ...designerInitialState,

  setActiveSection: (sectionId: string) => {
    set({
      activeSectionId: sectionId,
      selectedField: null,
    });
  },

  addSection: (title?: string) => {
    const newSection = createDesignerSection(title);

    set((state) => ({
      sections: [...state.sections, newSection],
      activeSectionId: newSection.id,
      selectedField: null,
    }));
  },

  removeSection: (sectionId: string) => {
    set((state) => {
      const nextSections = state.sections.filter((s) => s.id !== sectionId);

      if (nextSections.length === 0) {
        const fallback = createDesignerSection('Section 1');

        return {
          sections: [fallback],
          activeSectionId: fallback.id,
          selectedField: null,
        };
      }

      return {
        sections: nextSections,
        activeSectionId:
          state.activeSectionId === sectionId
            ? nextSections[0].id
            : state.activeSectionId,
        selectedField:
          state.selectedField?.sectionId === sectionId
            ? null
            : state.selectedField,
      };
    });
  },

  updateSectionMeta: (
    sectionId: string,
    payload: { title?: string; description?: string }
  ) => {
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              title: payload.title ?? section.title,
              description: payload.description ?? section.description,
            }
          : section
      ),
    }));
  },

  handleSelectedField: (payload) => {
    set({
      selectedField: payload,
    });
  },

  addElement: (sectionId, index, element) => {
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const nextFields = [...section.fields];
        const safeIndex = Math.max(0, Math.min(index, nextFields.length));

        nextFields.splice(safeIndex, 0, element);

        return {
          ...section,
          fields: nextFields,
        };
      }),
    }));
  },

  removeField: (sectionId, fieldId) => {
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        return {
          ...section,
          fields: section.fields.filter((field) => field.id !== fieldId),
        };
      }),
      selectedField:
        state.selectedField?.sectionId === sectionId &&
        state.selectedField?.fieldId === fieldId
          ? null
          : state.selectedField,
    }));
  },

  updateField: (updatedField, type) => {
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id !== state.activeSectionId) return section;

        const fieldIndex = section.fields.findIndex(
          (field) => field.id === updatedField.id
        );

        if (fieldIndex === -1) return section;

        const nextFields = [...section.fields];

        if (type === UpdatedTypeEnum.EditableForm) {
          nextFields[fieldIndex] = {
            ...nextFields[fieldIndex],
            properties: updatedField.properties,
          };
        }

        if (type === UpdatedTypeEnum.RuleForm) {
          nextFields[fieldIndex] = {
            ...nextFields[fieldIndex],
            rules: updatedField.rules,
          };
        }

        return {
          ...section,
          fields: nextFields,
        };
      }),
    }));
  },

  reorderFieldInSection: (sectionId, activeFieldId, overFieldId) => {
    if (activeFieldId === overFieldId) return;

    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const oldIndex = section.fields.findIndex(
          (field) => field.id === activeFieldId
        );
        const newIndex = section.fields.findIndex(
          (field) => field.id === overFieldId
        );

        if (oldIndex === -1 || newIndex === -1) return section;
        if (oldIndex === newIndex) return section;

        return {
          ...section,
          fields: arrayMove(section.fields, oldIndex, newIndex),
        };
      }),
    }));
  },

  setFormStructure: (sections) => {
    if (sections.length === 0) return;

    set({
      sections,
      activeSectionId: sections[0].id,
      selectedField: null,
    });
  },

  resetDesigner: () => {
    const firstSection = createDesignerSection('Section 1');

    set({
      sections: [firstSection],
      activeSectionId: firstSection.id,
      selectedField: null,
    });
  },
});
