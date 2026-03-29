import { ArrowRight } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import { Card, CardContent } from '@/common/libs/ui/card';
import QuickFormFooter from './components/footer/QuickFormFooter';
import NavbarLandingPage from './components/navbar/NavbarLandingPage';
import Hero from './components/hero/Hero';
import SectionHeader from './components/common/SectionHeader';
import { faqsData, stepsData } from './data/landing.data';
import FeaturesSection from './components/sections/FeaturesSection';
import UseCasesSection from './components/sections/UseCasesSection';

function HowItWorks() {
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
}

function CTA() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-border bg-primary px-8 py-12 text-primary-foreground shadow-2xl shadow-black/10 sm:px-12 lg:py-16 dark:shadow-black/30">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              Ready to launch
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Turn your form process into a cleaner product experience.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              QuickForm helps you deliver forms that look better, feel easier,
              and generate more useful data for your business.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Button variant="secondary" className="h-12 rounded-xl px-6">
              Start free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-primary-foreground/20 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <SectionHeader
        eyebrow="FAQ"
        title="Common questions"
        description="A few quick answers to help position QuickForm clearly on the homepage."
      />

      <div className="mt-12 space-y-4">
        {faqsData.map((faq) => (
          <Card
            key={faq.question}
            className="rounded-[24px] border-border bg-card shadow-sm"
          >
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarLandingPage />
      <Hero />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorks />
      <FAQ />
      <CTA />
      <QuickFormFooter />
    </div>
  );
};

export default LandingPage;
