import {
  Wand2,
  Zap,
  LayoutDashboard,
  ShieldCheck,
  Database,
  Sparkles,
  ClipboardList,
  Users,
  FileText,
} from 'lucide-react';

export const featuresData = [
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

export const useCasesData = [
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
    icon: ShieldCheck,
  },
  {
    title: 'Customer portals',
    description:
      'Publish public forms with a clean filling experience that feels simple and professional.',
    icon: FileText,
  },
];

export const stepsData = [
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

export const faqsData = [
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

export const heroStats = [
  {
    value: '10x',
    label: 'Faster form setup',
  },
  {
    value: '99.9%',
    label: 'Reliable submission flow',
  },
  {
    value: '24/7',
    label: 'Always-on collection',
  },
] as const;
