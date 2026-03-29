import { Card, CardContent } from '@/common/libs/ui/card';
import React from 'react';
import { stepsData } from '../../data/landing.data';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From idea to live form in a simple flow
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            QuickForm helps you move from scattered requirements to a structured
            digital experience with less friction, better consistency, and a
            more professional final result.
          </p>
        </div>

        <div className="grid gap-5">
          {stepsData.map((step, index) => (
            <Card
              key={step.title}
              className="rounded-[24px] border-border bg-card shadow-sm"
            >
              <CardContent className="flex gap-5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
