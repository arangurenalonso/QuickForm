'use client';

import { useCallback, useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Button } from '@/common/libs/ui/button';
import { cn } from '@/common/libs/utils';
import SectionFieldsRenderer from './SectionFieldsRenderer';
import type { DynamicFormValues } from './type/form-rende.type';
import { hasError } from './method/form-render.type';
import { SectionType } from '../form-designer/context/designer-context.type';

type RenderDefaultFormProps = {
  sections: SectionType[];
  onSubmit?: (values: unknown) => void;
  showSubmitButton?: boolean;
};

export default function RenderDefaultForm({
  sections,
  onSubmit,
  showSubmitButton = true,
}: RenderDefaultFormProps) {
  const { watch, control, handleSubmit, reset } = useForm<DynamicFormValues>({
    mode: 'onTouched',
    shouldUnregister: false,
  });

  const { errors, submitCount } = useFormState({ control });

  useEffect(() => {
    reset();
  }, [sections, reset]);

  const sectionHasErrors = useCallback(
    (section: SectionType) => {
      if (submitCount <= 0) return false;

      return section.fields.some((field) => {
        const fieldName = field.properties.name;
        if (!fieldName) return false;
        return hasError(errors, fieldName);
      });
    },
    [submitCount, errors]
  );

  return (
    <form
      onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
      className="space-y-5"
    >
      <div className="space-y-2">
        <span className="qf-badge-info">Default layout</span>
        <div>
          <h2 className="qf-section-title text-lg">Classic form flow</h2>
          <p className="qf-section-description">
            All sections are visible in one continuous experience.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => {
          const hasSectionErrors = sectionHasErrors(section);

          return (
            <section
              key={section.id}
              className={cn(
                'qf-surface overflow-hidden',
                hasSectionErrors && 'border-destructive'
              )}
            >
              <div className="border-b bg-muted/40 px-6 py-4">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold',
                      hasSectionErrors
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-accent text-accent-foreground'
                    )}
                  >
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground">
                      {section.title || `Section ${index + 1}`}
                    </h3>

                    {section.description && (
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {section.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-6">
                <SectionFieldsRenderer
                  section={section}
                  control={control}
                  watch={watch}
                />
              </div>
            </section>
          );
        })}
      </div>

      {showSubmitButton && !!onSubmit && (
        <div className="sticky bottom-0 z-10 rounded-2xl border bg-background/95 p-3 backdrop-blur">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      )}
    </form>
  );
}
