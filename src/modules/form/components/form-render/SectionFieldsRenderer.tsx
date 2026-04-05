'use client';

import React, { ComponentType } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';
import { DynamicFormValues } from './type/form-rende.type';
import { SectionType } from '../form-designer/context/designer-context.type';
import { FormFieldConfigType } from '../controlledField/common/enum/FormFieldConfigType';

type SectionFieldsRendererProps = {
  section: SectionType;
  control: Control<DynamicFormValues>;
  watch: UseFormWatch<DynamicFormValues>;
};

function renderControlledField<TField extends FormFieldConfigType>(
  field: TField,
  control: Control<DynamicFormValues>,
  watch: UseFormWatch<DynamicFormValues>
) {
  const ControlledField = field.render.Controlled as ComponentType<
    TField['properties'] & {
      control: Control<DynamicFormValues>;
      watch: UseFormWatch<DynamicFormValues>;
      rules?: TField['rules'];
    }
  >;

  return (
    <ControlledField
      key={field.id}
      {...field.properties}
      control={control}
      watch={watch}
      rules={field.rules}
    />
  );
}

const SectionFieldsRenderer = ({
  section,
  control,
  watch,
}: SectionFieldsRendererProps) => {
  return (
    <div className="flex flex-col gap-4">
      {section.fields.map((field) =>
        renderControlledField(field, control, watch)
      )}
    </div>
  );
};

export default SectionFieldsRenderer;
