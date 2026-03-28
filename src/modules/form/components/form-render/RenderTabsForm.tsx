'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Button } from '@/common/libs/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/libs/ui/tabs';
import { cn } from '@/common/libs/utils';

import SectionFieldsRenderer from './SectionFieldsRenderer';
import type { DynamicFormValues } from './type/form-rende.type';
import { hasError } from './method/form-render.type';
import { SectionType } from '../form-designer/context/designer-context.type';

type RenderTabsFormProps = {
  sections: SectionType[];
  onSubmit?: (values: unknown) => void;
  showSubmitButton?: boolean;
};

export default function RenderTabsForm({
  sections,
  onSubmit,
  showSubmitButton = true,
}: RenderTabsFormProps) {
  const firstId = sections[0]?.id ?? '';
  const [tab, setTab] = useState(firstId);

  const { watch, control, handleSubmit, reset } = useForm<DynamicFormValues>({
    mode: 'onTouched',
    shouldUnregister: false,
  });

  const { errors, submitCount } = useFormState({ control });

  useEffect(() => {
    if (!sections.length) {
      setTab('');
      return;
    }

    setTab((current) =>
      current && sections.some((section) => section.id === current)
        ? current
        : sections[0].id
    );
  }, [sections]);

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

  const sectionsWithErrorFlag = useMemo(
    () =>
      sections.map((section) => ({
        section,
        hasErrors: sectionHasErrors(section),
      })),
    [sections, sectionHasErrors]
  );

  return (
    <form
      onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
      className="space-y-5"
    >
      <div className="space-y-2">
        <span className="qf-badge-info">Tabbed layout</span>
        <div>
          <h2 className="qf-section-title text-lg">Organized navigation</h2>
          <p className="qf-section-description">
            Users can jump between sections quickly without losing context.
          </p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-2xl border bg-muted/40 p-2">
          {sectionsWithErrorFlag.map(({ section, hasErrors }) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className={cn(
                'min-h-11 rounded-xl border bg-background px-4 py-2 text-sm transition-colors',
                'data-[state=active]:border-ring data-[state=active]:bg-accent data-[state=active]:text-foreground',
                hasErrors &&
                  'border-destructive text-destructive data-[state=active]:border-destructive data-[state=active]:bg-destructive/10'
              )}
            >
              <span className="truncate">{section.title}</span>

              {hasErrors && (
                <span className="ml-2 h-2 w-2 shrink-0 rounded-full bg-destructive" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section) => {
          const hasSectionErrors = sectionHasErrors(section);

          return (
            <TabsContent
              key={section.id}
              value={section.id}
              forceMount
              className="mt-4 data-[state=inactive]:hidden"
            >
              <section
                className={cn(
                  'qf-surface overflow-hidden',
                  hasSectionErrors && 'border-destructive'
                )}
              >
                <div className="border-b bg-muted/40 px-6 py-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {section.title}
                  </h3>

                  {section.description && (
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {section.description}
                    </p>
                  )}
                </div>

                <div className="px-6 py-6">
                  <SectionFieldsRenderer
                    section={section}
                    control={control}
                    watch={watch}
                  />
                </div>
              </section>
            </TabsContent>
          );
        })}
      </Tabs>

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
