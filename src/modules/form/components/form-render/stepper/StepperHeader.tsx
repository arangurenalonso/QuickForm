'use client';

import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/common/libs/utils';
import { SectionType } from '@/modules/form/store/designer/designer.model';

type StepperHeaderProps = {
  sections: SectionType[];
  currentIndex: number;
  hasErrors: (section: SectionType) => boolean;
};

const StepperHeader = ({
  sections,
  currentIndex,
  hasErrors,
}: StepperHeaderProps) => {
  return (
    <div className="qf-surface px-4 py-5">
      <div className="flex flex-wrap items-center gap-3 md:gap-0">
        {sections.map((section, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const hasSectionErrors = hasErrors(section);

          return (
            <div key={section.id} className="flex min-w-0 flex-1 items-center">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                    isCompleted &&
                      'border-success bg-success text-success-foreground',
                    isCurrent &&
                      !hasSectionErrors &&
                      'border-primary bg-primary text-primary-foreground',
                    hasSectionErrors &&
                      'border-destructive bg-destructive text-destructive-foreground',
                    !isCompleted &&
                      !isCurrent &&
                      !hasSectionErrors &&
                      'border-border bg-background text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : hasSectionErrors ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                <div className="min-w-0">
                  <p
                    className={cn(
                      'truncate text-sm font-medium',
                      isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {section.title || `Step ${index + 1}`}
                  </p>
                </div>
              </div>

              {index < sections.length - 1 && (
                <div
                  className={cn(
                    'mx-3 hidden h-px flex-1 md:block',
                    isCompleted ? 'bg-success' : 'bg-border'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperHeader;
