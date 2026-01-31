'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  //   CardTitle,
} from '@/common/libs/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/libs/ui/tabs';
import { Button } from '@/common/libs/ui/button';
import { useForm, useFormState } from 'react-hook-form';
import type { SectionType } from '@/modules/formbuilder/form-designer/context/designer-context.type';
import SectionFieldsRenderer from './SectionFieldsRenderer';
import { cn } from '@/common/libs/utils';

import { DynamicFormValues } from './type/form-rende.type';
import { hasError } from './method/form-render.type';

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
  const firstId = sections[0]?.id;
  const [tab, setTab] = useState(firstId);

  const { watch, control, handleSubmit, reset } = useForm<DynamicFormValues>({
    mode: 'onTouched',
    shouldUnregister: false,
  });
  const { errors, submitCount } = useFormState({ control });

  useEffect(() => {
    console.log('Resetting form due to sections change:', sections);
    reset();
  }, [sections, reset]);

  return (
    <form
      onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
      className="flex flex-col gap-4"
    >
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="w-full flex flex-wrap justify-start">
          {sections.map((s) => {
            const sectionHasErrors =
              submitCount > 0 &&
              s.fields.some((f) => {
                const fieldName = f.properties.name;
                if (!fieldName) return false;
                return hasError(errors, fieldName);
              });

            return (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className={cn(
                  'max-w-[220px] flex items-center gap-2',
                  sectionHasErrors && 'text-destructive border-destructive'
                )}
              >
                <span className="truncate">{s.title}</span>

                {sectionHasErrors && (
                  <span className="h-2 w-2 rounded-full bg-destructive shrink-0" />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {sections.map((s) => (
          <TabsContent
            key={s.id}
            value={s.id}
            forceMount
            className="mt-4 data-[state=inactive]:hidden"
          >
            <Card className="rounded-2xl">
              <CardHeader>
                {/* <CardTitle className="text-lg">{s.title}</CardTitle> */}
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
          </TabsContent>
        ))}
      </Tabs>

      {showSubmitButton && !!onSubmit && (
        <Button type="submit" className="w-full mt-2">
          Submit
        </Button>
      )}
    </form>
  );
}
