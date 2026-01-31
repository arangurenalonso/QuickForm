'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import type { SectionType } from '@/modules/formbuilder/form-designer/context/designer-context.type';

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

type RenderAccordionFormProps = {
  sections: SectionType[];
  onSubmit?: (values: unknown) => void;
  showSubmitButton?: boolean;
};

export default function RenderAccordionForm({
  sections,
  onSubmit,
  showSubmitButton = true,
}: RenderAccordionFormProps) {
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([]);

  const { watch, control, reset, handleSubmit } = useForm<DynamicFormValues>({
    mode: 'onTouched',
    shouldUnregister: false,
  });

  const { errors, submitCount } = useFormState({ control });

  const sectionsKey = useMemo(() => {
    return sections
      .map((s) => {
        const fieldNames = s.fields
          .map((f) => (f.properties.name as string | undefined) ?? '')
          .join(',');
        return `${s.id}:${fieldNames}`;
      })
      .join('|');
  }, [sections]);

  const lastSectionsKeyRef = useRef<string>('');

  useEffect(() => {
    if (lastSectionsKeyRef.current === sectionsKey) return;

    lastSectionsKeyRef.current = sectionsKey;
    reset();
    setOpenSectionIds([]);
  }, [sectionsKey, reset]);

  useEffect(() => {
    if (sections.length === 0) return;
    setOpenSectionIds([sections[0].id]);
  }, [sections]);

  const openSectionsWithErrors = () => {
    const ids = sections
      .filter((s) =>
        s.fields.some((f) => {
          const fieldName = f.properties.name;
          if (!fieldName) return false;
          return hasError(errors, fieldName);
        })
      )
      .map((s) => s.id);

    if (ids.length > 0) {
      setOpenSectionIds(ids);
    }
  };
  useEffect(() => {
    if (submitCount > 0) {
      openSectionsWithErrors();
    }
  }, [submitCount]);
  return (
    <form
      onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
      className="flex flex-col gap-4"
    >
      <Accordion
        type="multiple"
        value={openSectionIds}
        onValueChange={setOpenSectionIds}
        className="w-full space-y-3"
      >
        {sections.map((s) => {
          const sectionHasErrors =
            submitCount > 0 &&
            s.fields.some((f) => {
              const fieldName = f.properties.name;
              if (!fieldName) return false;
              return hasError(errors, fieldName);
            });

          return (
            <AccordionItem
              key={s.id}
              value={s.id}
              className={cn(
                'rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden',
                sectionHasErrors && 'border-destructive'
              )}
            >
              <AccordionTrigger
                className={cn(
                  'px-6 py-4 hover:no-underline',
                  sectionHasErrors && 'text-destructive'
                )}
              >
                <div className="w-full flex items-center gap-2">
                  <span className="truncate">{s.title}</span>

                  {sectionHasErrors && (
                    <span className="h-2 w-2 rounded-full bg-destructive shrink-0" />
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent forceMount className="px-6 pb-6 pt-0">
                {s.description && (
                  <p className="text-sm text-muted-foreground">
                    {s.description}
                  </p>
                )}

                <div className="mt-4 space-y-4">
                  <SectionFieldsRenderer
                    section={s}
                    control={control}
                    watch={watch}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {showSubmitButton && !!onSubmit && (
        <Button type="submit" className="w-full mt-2">
          Submit
        </Button>
      )}
    </form>
  );
}
