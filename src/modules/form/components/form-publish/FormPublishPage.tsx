'use client';

import React, { useMemo, useState } from 'react';
import {
  Globe,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  Mail,
  Send,
  CheckCircle2,
  Settings2,
  Rocket,
} from 'lucide-react';

import { Button } from '@/common/libs/ui/button';
import { Input } from '@/common/libs/ui/input';
import StatusBadge from '@/common/components/molecules/StatusBadge';
import useFormStore from '@/modules/form/hooks/useFormStore';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import { FORM_ACTION } from '../../enum/form.enum';
import PublishFormBtn from '../form-designer/component/navbar/navbar-btn/publish/PublishFormBtn';

const FormPublishPage = () => {
  const { formSelected } = useFormStore();

  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const formStatus = formSelected?.status;

  const canPublish = formSelected
    ? formSelected.status.allowedActions.includes(FORM_ACTION.Publish)
    : false;

  const publishedUrl = useMemo(() => {
    if (!formSelected) return '';

    // Replace this with your real published URL when you already have it in DB/store
    if ('publishedUrl' in formSelected && formSelected.publishedUrl) {
      return String(formSelected.publishedUrl);
    }

    if (typeof window !== 'undefined') {
      return `${window.location.origin}/form/${formSelected.id}`;
    }

    return '';
  }, [formSelected]);

  // Adjust this condition to your real model.
  // Example:
  // const isPublished = formSelected?.status.code === 'PUBLISHED';
  const isPublished = Boolean(publishedUrl);

  const handleCopy = async () => {
    if (!publishedUrl) return;

    try {
      await navigator.clipboard.writeText(publishedUrl);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error('Could not copy published link', error);
    }
  };

  const handleOpenPublishedForm = () => {
    if (!publishedUrl) return;
    window.open(publishedUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInvite = () => {
    // Replace with your real invite/share flow
    console.log('Invite email to form', {
      email: inviteEmail,
      formId: formSelected?.id,
      publishedUrl,
    });
  };

  return (
    <div className="min-h-full bg-muted/30 p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success text-success-foreground shadow-sm">
              <Rocket className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                  Publish Form
                </h1>

                {formStatus && <StatusBadge status={formStatus} size="sm" />}
              </div>

              <p className="text-sm text-muted-foreground">
                Share your form with a public link and invite people to respond.
              </p>
            </div>
          </div>
        </header>

        <section className="qf-surface overflow-hidden">
          <div className="border-b px-6 py-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-success text-success-foreground">
                <LinkIcon className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-semibold text-foreground">
                    Direct Link of Your Form
                  </h2>

                  {isPublished && (
                    <span className="qf-badge-success inline-flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Public Form
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">
                  Your form can be shared publicly using this address.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            {!isPublished ? (
              <div className="qf-surface-muted p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">
                      This form is not published yet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Publish it first to generate a public link and start
                      receiving submissions.
                    </p>
                  </div>

                  {formSelected && canPublish && (
                    <ActionGuard
                      currentActions={formSelected.status.allowedActions}
                      allowedActions={[FORM_ACTION.Publish]}
                    >
                      <PublishFormBtn idForm={formSelected.id} />
                    </ActionGuard>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="qf-surface-muted p-5">
                  <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">
                          Share with link
                        </h3>

                        <span className="qf-badge-success">Public Form</span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Anyone with this link can open the published form.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 self-start"
                    >
                      <Settings2 className="h-4 w-4" />
                      Settings
                    </Button>
                  </div>

                  <div className="rounded-xl border bg-background px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <Globe className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {publishedUrl}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      onClick={handleCopy}
                      className="gap-2 bg-success text-success-foreground hover:bg-success/90"
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? 'Copied' : 'Copy Link'}
                    </Button>

                    <Button
                      type="button"
                      onClick={handleOpenPublishedForm}
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open in New Tab
                    </Button>
                  </div>
                </div>

                <div className="border-t" />

                <div className="qf-surface-muted p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info text-info-foreground">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        Invite by email
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Send the published form to collaborators or respondents.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="flex-1"
                    />

                    <Button
                      type="button"
                      onClick={handleInvite}
                      disabled={!inviteEmail.trim()}
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send Invite
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormPublishPage;
