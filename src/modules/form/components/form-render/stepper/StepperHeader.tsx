'use client';

import type { SectionType } from '@/modules/form/components/form-designer/context/designer-context.type';

type StepperHeaderProps = {
  sections: SectionType[];
  currentIndex: number;
  hasErrors: (section: SectionType) => boolean;
};

export default function StepperHeader({
  sections,
  currentIndex,
}: StepperHeaderProps) {
  const total = Math.max(sections.length, 1);
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      {/* Top info */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">
            Paso {currentIndex + 1} de {sections.length}
          </p>
          <p className="text-base font-semibold truncate">
            {sections[currentIndex]?.title}
          </p>
        </div>

        <div className="text-sm font-medium tabular-nums">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
