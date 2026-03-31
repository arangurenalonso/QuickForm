'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/common/libs/ui/button';
import { cn } from '@/common/libs/utils';

import StepperHeader from './StepperHeader';
import { hasError } from '../method/form-render.type';
import SectionFieldsRenderer from '../SectionFieldsRenderer';
import { DynamicFormValues } from '../type/form-rende.type';
import { SectionType } from '../../form-designer/context/designer-context.type';

type RenderStepperFormProps = {
  sections: SectionType[];
  onSubmit?: (values: unknown) => void;
  showSubmitButton?: boolean;
  showInstruction?: boolean;
};

export default function RenderStepperForm({
  sections,
  onSubmit,
  showSubmitButton = true,
  showInstruction,
}: RenderStepperFormProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const { watch, control, reset, trigger, getValues } =
    useForm<DynamicFormValues>({
      mode: 'onChange',
      reValidateMode: 'onChange',
      shouldUnregister: false,
    });

  const { errors } = useFormState({ control });

  const isLastStep = stepIndex >= sections.length - 1;
  const isFirstStep = stepIndex <= 0;

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

  useEffect(() => {
    if (lastSectionsKeyRef.current === sectionsKey) return;

    lastSectionsKeyRef.current = sectionsKey;
    reset();
    setStepIndex(0);
  }, [sectionsKey, reset]);

  const currentSection = sections[stepIndex];

  const currentFieldNames = useMemo(() => {
    if (!currentSection) return [];

    return currentSection.fields
      .map((field) => field.properties.name)
      .filter((name): name is string => !!name);
  }, [currentSection]);

  const sectionHasErrors = (section: SectionType) =>
    section.fields.some((field) => {
      const fieldName = field.properties.name;
      if (!fieldName) return false;
      return hasError(errors, fieldName);
    });

  const handleNext = async () => {
    const isValid =
      currentFieldNames.length === 0
        ? true
        : await trigger(currentFieldNames, { shouldFocus: true });

    if (!isValid) return;

    setStepIndex((previous) => Math.min(previous + 1, sections.length - 1));
  };

  const handleBack = () => {
    setStepIndex((previous) => Math.max(previous - 1, 0));
  };

  const handleFinalSubmit = async () => {
    const isValid = await trigger(undefined, { shouldFocus: true });
    if (!isValid) return;

    onSubmit?.(getValues());
  };

  if (!currentSection) return null;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (isLastStep && onSubmit) {
          handleFinalSubmit();
        }
      }}
      className="space-y-5"
    >
      {showInstruction && (
        <div className="space-y-2">
          <span className="qf-badge-info">Stepper layout</span>
          <div>
            <h2 className="qf-section-title text-lg">Guided completion</h2>
            <p className="qf-section-description">
              Best for long forms that should feel simple and progressive.
            </p>
          </div>
        </div>
      )}

      <StepperHeader
        sections={sections}
        currentIndex={stepIndex}
        hasErrors={sectionHasErrors}
      />

      {sections.map((section, index) => {
        const isActive = index === stepIndex;
        const hasSectionErrors = sectionHasErrors(section);

        return (
          <section key={section.id} className={cn(!isActive && 'hidden')}>
            <div
              className={cn(
                'qf-surface overflow-hidden',
                hasSectionErrors && 'border-destructive'
              )}
            >
              <div className="border-b bg-muted/40 px-6 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Step {index + 1} of {sections.length}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-foreground">
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
            </div>
          </section>
        );
      })}

      <div className="sticky bottom-0 z-10 rounded-2xl border bg-background/95 p-3 backdrop-blur">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isFirstStep}
            className="sm:min-w-32"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {!isLastStep && (
            <Button
              type="button"
              onClick={handleNext}
              className="sm:ml-auto sm:min-w-32"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          {isLastStep && showSubmitButton && !!onSubmit && (
            <Button type="submit" className="sm:ml-auto sm:min-w-32">
              Submit
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
