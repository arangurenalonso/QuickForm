import React from 'react';
import { Control, UseFormWatch } from 'react-hook-form';
import { SectionType } from '../../context/designer-context.type';
import { DynamicFormValues } from './type/form-rende.type';

type SectionFieldsRendererProps = {
  section: SectionType;
  control: Control<DynamicFormValues>;
  watch: UseFormWatch<DynamicFormValues>;
};

const SectionFieldsRenderer = ({
  section,
  control,
  watch,
}: SectionFieldsRendererProps) => {
  return (
    <div className="flex flex-col gap-4">
      {section.fields.map((field) => {
        const { render, properties, rules } = field;
        const { Controlled } = render;
        return (
          <Controlled
            key={field.id}
            {...properties}
            control={control}
            watch={watch}
            rules={rules}
          />
        );
      })}
    </div>
  );
};

export default SectionFieldsRenderer;
