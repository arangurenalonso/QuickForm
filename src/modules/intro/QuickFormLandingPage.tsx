import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Database,
  FileText,
  LayoutDashboard,
  Lock,
  Menu,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
  Zap,
} from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/libs/ui/card';
import QuickFormFooter from './QuickFormFooter';

const stats = [
  { label: 'Forms launched faster', value: '10x' },
  { label: 'Reusable form blocks', value: '100+' },
  { label: 'Submission visibility', value: 'Real-time' },
  { label: 'Setup complexity', value: 'Low' },
];

const features = [
  {
    icon: Wand2,
    title: 'Build forms visually',
    description:
      'Create dynamic forms with sections, fields, validations, and conditional flows without fighting the UI.',
  },
  {
    icon: Zap,
    title: 'Move faster with reusable logic',
    description:
      'Reuse templates, rules, and field structures so your team can launch new workflows in minutes.',
  },
  {
    icon: LayoutDashboard,
    title: 'See submissions clearly',
    description:
      'Review answers in a clean table view with filters, status tracking, and an experience designed for operations.',
  },
  {
    icon: ShieldCheck,
    title: 'Control access safely',
    description:
      'Keep forms and responses protected with permission-aware access and a structure built for serious business use.',
  },
  {
    icon: Database,
    title: 'Structured data from day one',
    description:
      'Every answer is stored in a way that is useful for reporting, automation, and future integrations.',
  },
  {
    icon: Sparkles,
    title: 'Made for growth',
    description:
      'Start simple, then scale to more complex approval flows, teams, customers, and business processes.',
  },
];

const useCases = [
  {
    title: 'Operations',
    description:
      'Standardize requests, internal processes, and approvals with consistent digital forms.',
    icon: ClipboardList,
  },
  {
    title: 'Sales',
    description:
      'Capture structured client information faster and reduce friction in onboarding flows.',
    icon: Users,
  },
  {
    title: 'Compliance',
    description:
      'Add validations, mandatory fields, and clear records for audit-friendly workflows.',
    icon: Lock,
  },
  {
    title: 'Customer portals',
    description:
      'Publish public forms with a clean filling experience that feels simple and professional.',
    icon: FileText,
  },
];

const steps = [
  {
    title: 'Design the form',
    description:
      'Choose sections, inputs, and validation rules in a clear builder experience.',
  },
  {
    title: 'Publish in minutes',
    description:
      'Share a public page or connect it to your internal workflow without extra friction.',
  },
  {
    title: 'Manage responses',
    description:
      'Review submissions in one place with better visibility, consistency, and control.',
  },
];

const faqs = [
  {
    question: 'Who is QuickForm for?',
    answer:
      'QuickForm is ideal for teams that need to create and manage forms quickly without losing structure, usability, or control.',
  },
  {
    question: 'Can I use it for internal and public forms?',
    answer:
      'Yes. QuickForm can support internal workflows as well as public-facing forms for customers, partners, or applicants.',
  },
  {
    question: 'Does it support complex forms?',
    answer:
      'Yes. It is designed to grow from simple data capture to more advanced validations, sections, and dynamic behaviors.',
  },
];

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function BrandMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
      <MousePointerClick className="h-5 w-5" />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div>
            <p className="text-base font-semibold text-foreground">QuickForm</p>
            <p className="text-xs text-muted-foreground">Form builder SaaS</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#use-cases"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Use cases
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button className="rounded-xl px-5">Start free</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_32%),radial-gradient(circle_at_bottom_right,hsl(var(--foreground)/0.06),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm">
            <Sparkles className="h-4 w-4" />
            Create smarter forms with a cleaner experience
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build, publish, and manage forms without making your users think too
            hard.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            QuickForm is a modern SaaS platform that helps teams create dynamic
            forms, collect structured data, and manage submissions through a
            user-friendly experience that feels simple, fast, and professional.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 rounded-xl px-6">
              Start building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-12 rounded-xl px-6">
              Watch demo
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((item) => (
              <Card
                key={item.label}
                className="rounded-2xl border-border bg-card/80 shadow-sm backdrop-blur"
              >
                <CardContent className="p-4">
                  <p className="text-2xl font-semibold text-card-foreground">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -left-8 top-10 hidden h-24 w-24 rounded-full bg-primary/10 blur-2xl lg:block" />
          <Card className="overflow-hidden rounded-[28px] border-border shadow-xl shadow-black/5 dark:shadow-black/25">
            <CardHeader className="border-b border-border bg-muted/50 pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Live preview
                  </p>
                  <CardTitle className="mt-1 text-xl text-card-foreground">
                    Customer onboarding form
                  </CardTitle>
                </div>
                <div className="rounded-full border border-border bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  Published
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Company name
                </label>
                <div className="h-11 rounded-xl border border-input bg-background" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Email
                  </label>
                  <div className="h-11 rounded-xl border border-input bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Industry
                  </label>
                  <div className="h-11 rounded-xl border border-input bg-background" />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-accent p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-card-foreground">
                      Dynamic validation ready
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Required fields, conditional sections, and structured
                      answers designed for better data quality.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Builder
                  </p>
                  <p className="mt-1 text-base font-semibold text-card-foreground">
                    Drag, configure, preview
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Responses
                  </p>
                  <p className="mt-1 text-base font-semibold text-card-foreground">
                    Track submissions clearly
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeader
        eyebrow="Why QuickForm"
        title="Everything your team needs to create forms that people actually enjoy using"
        description="The goal is not only to build forms faster. It is to make the whole experience cleaner for administrators and easier for end users."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <Card className="h-full rounded-[24px] border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section id="use-cases" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Use cases"
          title="A flexible platform for real business workflows"
          description="QuickForm is not limited to one team. It adapts to the way different areas capture information, apply rules, and work with submissions."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="rounded-[24px] border-border bg-card shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
          {steps.map((step, index) => (
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
        {faqs.map((faq) => (
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

export default function QuickFormLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <UseCases />
      <HowItWorks />
      <FAQ />
      <CTA />
      <QuickFormFooter />
    </div>
  );
}
