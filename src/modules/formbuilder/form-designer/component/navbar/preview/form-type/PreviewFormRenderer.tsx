'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/common/libs/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/libs/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/libs/ui/tabs';
import { Progress } from '@/common/libs/ui/progress';
import type { Control, UseFormWatch } from 'react-hook-form';
import type { SectionType } from '@/modules/formbuilder/form-designer/context/designer-context.type';
import { PreviewFormVariant } from './PreviewFormVariant';

type Props = {
  sections: SectionType[];
  control: Control<any>;
  watch: UseFormWatch<any>;
  variant: PreviewFormVariant;
  onSubmit: (values: any) => void;
};

export default function PreviewFormRenderer({
  sections,
  control,
  watch,
  variant,
  onSubmit,
}: Props) {
  if (!sections?.length) {
    return (
      <div className="text-sm text-muted-foreground">No sections yet.</div>
    );
  }

  // helper: render fields of a section
  const renderSectionFields = (section: SectionType) => (
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

  // =========================
  // Variant: SIMPLE
  // =========================
  if (variant === 'simple') {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            {renderSectionFields(section)}
          </div>
        ))}

        <Button
          type="button"
          className="w-full mt-2"
          onClick={() => onSubmit(watch())}
        >
          Submit
        </Button>
      </form>
    );
  }

  // =========================
  // Variant: SECTION CARDS
  // =========================
  if (variant === 'section-cards') {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        {sections.map((section) => (
          <Card key={section.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderSectionFields(section)}
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          className="w-full mt-2"
          onClick={() => onSubmit(watch())}
        >
          Submit
        </Button>
      </form>
    );
  }

  // =========================
  // Variant: TABS
  // =========================
  if (variant === 'tabs') {
    const firstId = sections[0]?.id;
    const [tab, setTab] = useState(firstId);

    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start">
            {sections.map((s) => (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className="max-w-[220px] truncate"
              >
                {s.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((s) => (
            <TabsContent key={s.id} value={s.id} className="mt-4">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderSectionFields(s)}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Button
          type="button"
          className="w-full mt-2"
          onClick={() => onSubmit(watch())}
        >
          Submit
        </Button>
      </form>
    );
  }

  // =========================
  // Variant: STEPPER (Wizard)
  // =========================
  const [step, setStep] = useState(0);
  const total = sections.length;

  const current = sections[step];
  const progress = useMemo(
    () => Math.round(((step + 1) / total) * 100),
    [step, total]
  );

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Step {step + 1} of {total}
          </span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">{current.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderSectionFields(current)}
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </Button>

        {step < total - 1 ? (
          <Button
            type="button"
            className="flex-1"
            onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
          >
            Next
          </Button>
        ) : (
          <Button
            type="button"
            className="flex-1"
            onClick={() => onSubmit(watch())}
          >
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}
