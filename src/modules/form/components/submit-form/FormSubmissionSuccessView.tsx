'use client';

import Link from 'next/link';
import { CheckCircle2, FileText, Home, RotateCcw } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';

type FormSubmissionSuccessViewProps = {
  idForm: string;
};

const FormSubmissionSuccessView = ({
  idForm,
}: FormSubmissionSuccessViewProps) => {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>

          <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Submission completed
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            Thank you, your response has been submitted
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground md:text-base">
            We have successfully received your form submission. You can now
            close this page or go back if you need to submit the form again.
          </p>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-4 text-left">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <FileText className="h-4 w-4" />
                Submission received
              </div>
              <p className="text-sm text-muted-foreground">
                Your answers were sent correctly and are now registered.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4 text-left">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <RotateCcw className="h-4 w-4" />
                Need another response?
              </div>
              <p className="text-sm text-muted-foreground">
                You can return to the form if multiple submissions are allowed.
              </p>
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="gap-2">
              <Link href={`/fill-form/${idForm}`}>
                <RotateCcw className="h-4 w-4" />
                Back to form
              </Link>
            </Button>

            <Button asChild variant="outline" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go home
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            You can safely close this tab.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionSuccessView;
