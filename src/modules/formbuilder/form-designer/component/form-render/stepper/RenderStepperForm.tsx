'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';

import type { SectionType } from '@/modules/formbuilder/form-designer/context/designer-context.type';

import { Button } from '@/common/libs/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/common/libs/ui/card';
import { cn } from '@/common/libs/utils';

import StepperHeader from './StepperHeader';
import { hasError } from '../method/form-render.type';
import SectionFieldsRenderer from '../SectionFieldsRenderer';
import { DynamicFormValues } from '../type/form-rende.type';

type RenderStepperFormProps = {
  sections: SectionType[];
  onSubmit?: (values: unknown) => void;
  showSubmitButton?: boolean;
};

export default function RenderStepperForm({
  sections,
  onSubmit,
  showSubmitButton = true,
}: RenderStepperFormProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const { watch, control, reset, trigger, getValues } =
    useForm<DynamicFormValues>({
      // ✅ para que el rojo se quite mientras escribes
      mode: 'onChange',
      reValidateMode: 'onChange',
      shouldUnregister: false,
    });

  const { errors } = useFormState({ control });

  const isLastStep = stepIndex >= sections.length - 1;
  const isFirstStep = stepIndex <= 0;

  // ✅ detectar cambios reales de estructura
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
    setStepIndex(0);
  }, [sectionsKey, reset]);

  const currentSection = sections[stepIndex];

  // ✅ SOLO los fields del step actual (para Continuar)
  const currentFieldNames = useMemo(() => {
    if (!currentSection) return [];
    return currentSection.fields
      .map((f) => f.properties.name)
      .filter((n): n is string => !!n);
  }, [currentSection]);

  // ✅ errores por sección (para pintar rojo)
  const sectionHasErrors = (s: SectionType) =>
    s.fields.some((f) => {
      const fieldName = f.properties.name;
      if (!fieldName) return false;
      return hasError(errors, fieldName);
    });

  const validateCurrentStep = async () => {
    if (currentFieldNames.length === 0) return true;
    return trigger(currentFieldNames, { shouldFocus: true });
  };

  const handleNext = async () => {
    const ok = await validateCurrentStep();
    if (!ok) return;
    setStepIndex((prev) => Math.min(prev + 1, sections.length - 1));
  };

  const handleBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleFinalSubmit = async () => {
    const ok = await trigger(undefined, { shouldFocus: true });
    if (!ok) return;
    onSubmit?.(getValues());
  };

  if (!currentSection) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // ✅ solo submit en el último paso
        if (isLastStep && onSubmit) {
          handleFinalSubmit();
        }
      }}
      className="flex flex-col gap-4"
    >
      {/* ✅ Stepper tipo imagen (no clickable) */}
      <StepperHeader
        sections={sections}
        currentIndex={stepIndex}
        hasErrors={sectionHasErrors}
      />

      {/* ✅ Render ALL steps mounted, hide inactive (para no perder valores) */}
      {sections.map((s, idx) => {
        const active = idx === stepIndex;
        const hasErr = sectionHasErrors(s);

        return (
          <div key={s.id} className={cn(!active && 'hidden')}>
            <Card className={cn('rounded-2xl', hasErr && 'border-destructive')}>
              <CardHeader>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <SectionFieldsRenderer
                  section={s}
                  control={control}
                  watch={watch}
                />
              </CardContent>
            </Card>
          </div>
        );
      })}

      {/* ✅ Actions */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep}
        >
          Atrás
        </Button>

        {!isLastStep && (
          <Button type="button" className="ml-auto" onClick={handleNext}>
            Continuar
          </Button>
        )}

        {isLastStep && showSubmitButton && !!onSubmit && (
          <Button type="submit" className="ml-auto">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}
