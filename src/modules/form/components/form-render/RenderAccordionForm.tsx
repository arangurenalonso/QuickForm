'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Button } from '@/common/libs/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/common/libs/ui/accordion';
import { cn } from '@/common/libs/utils';

import SectionFieldsRenderer from './SectionFieldsRenderer';
import type { DynamicFormValues } from './type/form-rende.type';
import { hasError } from './method/form-render.type';
import { SectionType } from '../form-designer/context/designer-context.type';

type RenderAccordionFormProps = {
  sections: SectionType[];
  onSubmit?: (values: unknown) => void;
  showSubmitButton?: boolean;
  showInstruction?: boolean;
};

export default function RenderAccordionForm({
  sections,
  onSubmit,
  showSubmitButton = true,
  showInstruction = true,
}: RenderAccordionFormProps) {
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([]);

  const { watch, control, reset, handleSubmit } = useForm<DynamicFormValues>({
    mode: 'onTouched',
    shouldUnregister: false,
  });

  const { errors, submitCount } = useFormState({ control });

  const sectionsKey = useMemo(() => {
    return sections
      .map((section) => {
        const fieldNames = section.fields
          .map((field) => (field.properties.name as string | undefined) ?? '')
          .join(',');

        return `${section.id}:${fieldNames}`;
      })
      .join('|');
  }, [sections]);

  const lastSectionsKeyRef = useRef<string>('');

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

  useEffect(() => {
    if (lastSectionsKeyRef.current === sectionsKey) return;

    lastSectionsKeyRef.current = sectionsKey;
    reset();
    setOpenSectionIds(sections[0] ? [sections[0].id] : []);
  }, [sectionsKey, sections, reset]);

  useEffect(() => {
    if (submitCount <= 0) return;

    const ids = sections.filter(sectionHasErrors).map((section) => section.id);
    if (ids.length > 0) {
      setOpenSectionIds(ids);
    }
  }, [submitCount, sections, sectionHasErrors]);

  return (
    <form
      onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
      className="space-y-5"
    >
      {showInstruction && (
        <div className="space-y-2">
          <span className="qf-badge-info">Accordion layout</span>
          <div>
            <h2 className="qf-section-title text-lg">Compact and clean</h2>
            <p className="qf-section-description">
              Sections expand only when needed, which reduces visual overload.
            </p>
          </div>
        </div>
      )}

      <Accordion
        type="multiple"
        value={openSectionIds}
        onValueChange={setOpenSectionIds}
        className="space-y-3"
      >
        {sections.map((section, index) => {
          const hasSectionErrors = sectionHasErrors(section);

          return (
            <AccordionItem
              key={section.id}
              value={section.id}
              className={cn(
                'qf-surface overflow-hidden',
                hasSectionErrors && 'border-destructive'
              )}
            >
              <AccordionTrigger
                className={cn(
                  'px-6 py-5 hover:no-underline',
                  hasSectionErrors && 'text-destructive'
                )}
              >
                <div className="flex w-full items-start gap-4 text-left">
                  <div
                    className={cn(
                      'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold',
                      hasSectionErrors
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-accent text-accent-foreground'
                    )}
                  >
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold">
                      {section.title}
                    </p>

                    {section.description && (
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {section.description}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent forceMount className="px-6 pb-6 pt-0">
                <SectionFieldsRenderer
                  section={section}
                  control={control}
                  watch={watch}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

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
