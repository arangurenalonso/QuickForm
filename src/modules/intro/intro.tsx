import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  FolderKanban,
  LayoutDashboard,
  ListFilter,
  Menu,
  Moon,
  MousePointerClick,
  PencilLine,
  Plus,
  Search,
  Settings,
  Shield,
  Sparkles,
  Sun,
} from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/libs/ui/card';
import { Input } from '@/common/libs/ui/input';

type AppView = 'dashboard' | 'forms' | 'builder' | 'submissions' | 'settings';

type NavItem = {
  id: AppView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'forms', label: 'Forms', icon: FolderKanban, badge: '12' },
  { id: 'builder', label: 'Builder', icon: PencilLine },
  {
    id: 'submissions',
    label: 'Submissions',
    icon: FileSpreadsheet,
    badge: '248',
  },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const summaryCards = [
  {
    title: 'Active forms',
    value: '12',
    change: '+18% this month',
    icon: FolderKanban,
  },
  {
    title: 'Total submissions',
    value: '2,483',
    change: '+9.4% this week',
    icon: FileText,
  },
  {
    title: 'Completion rate',
    value: '84%',
    change: '+4 points',
    icon: CheckCircle2,
  },
  {
    title: 'Avg. build time',
    value: '14 min',
    change: '-22% faster',
    icon: Clock3,
  },
];

const forms = [
  {
    name: 'Customer onboarding',
    status: 'Published',
    updated: '2 hours ago',
    submissions: 432,
    visibility: 'Public',
  },
  {
    name: 'Employee equipment request',
    status: 'Draft',
    updated: 'Yesterday',
    submissions: 37,
    visibility: 'Internal',
  },
  {
    name: 'Vendor registration',
    status: 'Published',
    updated: '3 days ago',
    submissions: 119,
    visibility: 'Public',
  },
  {
    name: 'IT support intake',
    status: 'Published',
    updated: '1 week ago',
    submissions: 226,
    visibility: 'Internal',
  },
];

const activities = [
  'Customer onboarding form was published by Alonso',
  'A new submission arrived in Vendor registration',
  'Equipment request workflow was updated',
  'Three users were added to the Operations workspace',
];

const submissionRows = [
  {
    id: '#SUB-1001',
    form: 'Customer onboarding',
    respondent: 'Apex Logistics',
    status: 'Reviewed',
    submittedAt: '8:42 AM',
  },
  {
    id: '#SUB-1002',
    form: 'Vendor registration',
    respondent: 'Northwind Labs',
    status: 'Pending',
    submittedAt: '9:18 AM',
  },
  {
    id: '#SUB-1003',
    form: 'IT support intake',
    respondent: 'Maria Lopez',
    status: 'Approved',
    submittedAt: '10:07 AM',
  },
  {
    id: '#SUB-1004',
    form: 'Employee equipment request',
    respondent: 'Kevin Ortiz',
    status: 'Pending',
    submittedAt: '11:31 AM',
  },
  {
    id: '#SUB-1005',
    form: 'Customer onboarding',
    respondent: 'BluePeak Retail',
    status: 'Reviewed',
    submittedAt: '12:02 PM',
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function BrandMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
      <MousePointerClick className="h-5 w-5" />
    </div>
  );
}

function AppLogo() {
  return (
    <div className="flex items-center gap-3">
      <BrandMark />
      <div>
        <p className="text-sm font-semibold text-foreground">QuickForm</p>
        <p className="text-xs text-muted-foreground">Workspace</p>
      </div>
    </div>
  );
}

function StatusBadge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'success' | 'warning';
}) {
  const toneClass =
    tone === 'success'
      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
      : tone === 'warning'
        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
        : 'bg-accent text-accent-foreground border-border';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        toneClass
      )}
    >
      {children}
    </span>
  );
}

function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
      {action ? <div className="flex items-center gap-3">{action}</div> : null}
    </div>
  );
}

function Sidebar({
  currentView,
  onChangeView,
}: {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}) {
  return (
    <aside className="hidden border-r border-border bg-card lg:flex lg:w-[280px] lg:flex-col">
      <div className="border-b border-border px-6 py-5">
        <AppLogo />
      </div>

      <div className="flex-1 px-4 py-5">
        <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Workspace
        </div>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === currentView;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeView(item.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
                {item.badge ? (
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                      isActive
                        ? 'bg-primary-foreground/15 text-primary-foreground'
                        : 'bg-accent text-accent-foreground'
                    )}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border p-4">
        <div className="rounded-2xl border border-border bg-background p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Operations Team
              </p>
              <p className="text-xs text-muted-foreground">
                Business workspace
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({
  currentView,
  onChangeView,
  isDark,
  onToggleTheme,
}: {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const currentLabel = useMemo(
    () =>
      navItems.find((item) => item.id === currentView)?.label ?? 'Dashboard',
    [currentView]
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <AppLogo />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={onToggleTheme}>
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              QuickForm / {currentLabel}
            </p>
            <p className="text-lg font-semibold text-foreground">
              Welcome back, Alonso
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-[260px] flex-1 sm:w-[320px] sm:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-11 rounded-xl pl-9"
                placeholder="Search forms, submissions, templates..."
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:inline-flex"
                onClick={onToggleTheme}
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:inline-flex"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button className="h-11 rounded-xl px-5">
                <Plus className="mr-2 h-4 w-4" />
                Create form
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === currentView;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeView(item.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm whitespace-nowrap transition',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="A quick overview of your forms, submission flow, and recent workspace activity."
        action={
          <>
            <Button variant="outline" className="rounded-xl">
              <BarChart3 className="mr-2 h-4 w-4" />
              View analytics
            </Button>
            <Button className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              New form
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="rounded-[24px] border-border bg-card shadow-sm"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-card-foreground">
                      {item.value}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {item.change}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[28px] border-border bg-card shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl text-card-foreground">
                  Top forms
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your most active workflows this week.
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                See all
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {forms.slice(0, 4).map((form) => (
              <div
                key={form.name}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">{form.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {form.submissions} submissions · updated {form.updated}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge
                    tone={form.status === 'Published' ? 'success' : 'warning'}
                  >
                    {form.status}
                  </StatusBadge>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Eye className="mr-2 h-4 w-4" />
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground">
              Recent activity
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              What changed recently in your workspace.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((item, index) => (
              <div key={item} className="flex gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  {index % 2 === 0 ? (
                    <Activity className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </div>
                <div className="rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
                  {item}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FormsView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Forms"
        description="Manage all your forms, visibility, and publishing status from a single place."
        action={
          <Button className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Create form
          </Button>
        }
      />

      <Card className="rounded-[28px] border-border bg-card shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-11 rounded-xl pl-9"
                  placeholder="Search forms..."
                />
              </div>
              <Button variant="outline" className="rounded-xl">
                <Filter className="mr-2 h-4 w-4" />
                Status
              </Button>
              <Button variant="outline" className="rounded-xl">
                <ListFilter className="mr-2 h-4 w-4" />
                Visibility
              </Button>
            </div>
            <Button variant="outline" className="rounded-xl">
              Export list
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-[28px] border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead className="bg-muted/40">
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-6 py-4 font-medium">Form</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Updated</th>
                <th className="px-6 py-4 font-medium">Submissions</th>
                <th className="px-6 py-4 font-medium">Visibility</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr
                  key={form.name}
                  className="border-b border-border/70 last:border-0"
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-foreground">{form.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Structured workflow form
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge
                      tone={form.status === 'Published' ? 'success' : 'warning'}
                    >
                      {form.status}
                    </StatusBadge>
                  </td>
                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {form.updated}
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-foreground">
                    {form.submissions}
                  </td>
                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {form.visibility}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl text-muted-foreground hover:text-foreground"
                      >
                        Open
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function BuilderView() {
  const fieldLibrary = [
    'Text input',
    'Email',
    'Phone',
    'Select',
    'Date',
    'Textarea',
    'Checkbox',
    'Radio group',
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Form builder"
        description="A focused workspace to design sections, fields, and validation rules with a live preview."
        action={
          <>
            <Button variant="outline" className="rounded-xl">
              Preview
            </Button>
            <Button className="rounded-xl">Publish</Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[280px_1fr_320px]">
        <Card className="rounded-[28px] border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Field library
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Drag components into your form canvas.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {fieldLibrary.map((item) => (
              <button
                key={item}
                type="button"
                className="flex w-full items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-left text-sm font-medium text-foreground transition hover:bg-muted"
              >
                {item}
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg text-card-foreground">
                  Customer onboarding
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Live form preview
                </p>
              </div>
              <StatusBadge tone="success">Autosaved</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Section 01
              </p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">
                Company information
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us a bit about your company so we can start the onboarding
                process.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Company name
                  </label>
                  <div className="h-11 rounded-xl border border-input bg-card" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Industry
                  </label>
                  <div className="h-11 rounded-xl border border-input bg-card" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Business email
                  </label>
                  <div className="h-11 rounded-xl border border-input bg-card" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-5 text-center text-sm text-muted-foreground">
              Drop more fields here to continue building the form.
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Field properties
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Edit the selected field configuration.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Label
              </label>
              <Input
                className="h-11 rounded-xl"
                value="Company name"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Placeholder
              </label>
              <Input
                className="h-11 rounded-xl"
                value="Enter your company name"
                readOnly
              />
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Required field
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Users must complete this field.
                  </p>
                </div>
                <div className="h-6 w-11 rounded-full bg-primary p-1">
                  <div className="ml-auto h-4 w-4 rounded-full bg-primary-foreground" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-sm font-medium text-foreground">
                Validation rule
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Minimum 3 characters · visible to everyone
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SubmissionsView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Submissions"
        description="Review incoming responses, filter by workflow, and open details without leaving the page."
        action={
          <>
            <Button variant="outline" className="rounded-xl">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button className="rounded-xl">Export CSV</Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <Card className="overflow-hidden rounded-[28px] border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-muted/40">
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="px-6 py-4 font-medium">Submission ID</th>
                  <th className="px-6 py-4 font-medium">Form</th>
                  <th className="px-6 py-4 font-medium">Respondent</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Submitted at</th>
                </tr>
              </thead>
              <tbody>
                {submissionRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border/70 last:border-0"
                  >
                    <td className="px-6 py-5 font-medium text-foreground">
                      {row.id}
                    </td>
                    <td className="px-6 py-5 text-sm text-muted-foreground">
                      {row.form}
                    </td>
                    <td className="px-6 py-5 text-sm text-foreground">
                      {row.respondent}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge
                        tone={row.status === 'Pending' ? 'warning' : 'success'}
                      >
                        {row.status}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-5 text-sm text-muted-foreground">
                      {row.submittedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="rounded-[28px] border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Selected submission
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Quick side preview of a selected response.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-primary">
                #SUB-1002
              </p>
              <p className="mt-2 font-semibold text-foreground">
                Northwind Labs
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Vendor registration
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-background p-4 text-sm">
              <div>
                <p className="font-medium text-foreground">Business email</p>
                <p className="text-muted-foreground">
                  contact@northwindlabs.com
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">Category</p>
                <p className="text-muted-foreground">Technology vendor</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Status</p>
                <p className="text-muted-foreground">Pending review</p>
              </div>
            </div>

            <Button className="w-full rounded-xl">
              <Eye className="mr-2 h-4 w-4" />
              Open full details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Control your workspace branding, permissions, and behavior from a clean admin area."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-[28px] border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Workspace details
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Basic identity and public-facing information.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Workspace name
              </label>
              <Input
                className="h-11 rounded-xl"
                value="QuickForm Operations"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Default domain
              </label>
              <Input
                className="h-11 rounded-xl"
                value="app.quickform.io"
                readOnly
              />
            </div>
            <Button className="rounded-xl">Save changes</Button>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Access & permissions
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage who can create, publish, and review forms.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                role: 'Admin',
                description:
                  'Full access to forms, team, billing, and settings.',
              },
              {
                role: 'Editor',
                description: 'Can create forms and manage submissions.',
              },
              {
                role: 'Reviewer',
                description: 'Can review responses but cannot publish forms.',
              },
            ].map((item) => (
              <div
                key={item.role}
                className="rounded-2xl border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{item.role}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[28px] border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">
            Branding
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            A preview of how your public form experience can be customized.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm font-medium text-foreground">
                Primary color
              </p>
              <div className="mt-4 h-16 rounded-2xl bg-primary" />
            </div>
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm font-medium text-foreground">Surface</p>
              <div className="mt-4 h-16 rounded-2xl border border-border bg-card" />
            </div>
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm font-medium text-foreground">Accent</p>
              <div className="mt-4 h-16 rounded-2xl bg-accent" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RenderView({ currentView }: { currentView: AppView }) {
  switch (currentView) {
    case 'forms':
      return <FormsView />;
    case 'builder':
      return <BuilderView />;
    case 'submissions':
      return <SubmissionsView />;
    case 'settings':
      return <SettingsView />;
    case 'dashboard':
    default:
      return <DashboardView />;
  }
}

export default function QuickFormAuthenticatedPreview() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={cn(isDark && 'dark')}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
          <Sidebar currentView={currentView} onChangeView={setCurrentView} />

          <div className="flex min-h-screen flex-col">
            <Topbar
              currentView={currentView}
              onChangeView={setCurrentView}
              isDark={isDark}
              onToggleTheme={() => setIsDark((prev) => !prev)}
            />

            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              <motion.div
                key={currentView + String(isDark)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mx-auto max-w-[1500px]"
              >
                <RenderView currentView={currentView} />
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
