'use client';

import React, { useMemo, useState } from 'react';
import {
  Globe,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  // Mail,
  // Send,
  Rocket,
} from 'lucide-react';

import { Button } from '@/common/libs/ui/button';
// import { Input } from '@/common/libs/ui/input';
import StatusBadge from '@/common/components/molecules/StatusBadge';
import useFormStore from '@/modules/form/hooks/useFormStore';
const FormPublishPage = () => {
  const { formSelected } = useFormStore();

  const [copied, setCopied] = useState(false);
  // const [inviteEmail, setInviteEmail] = useState('');

  const formStatus = formSelected?.status;

  const publishedUrl = useMemo(() => {
    if (!formSelected) return '';

    // Replace this with your real published URL when you already have it in DB/store
    if ('publishedUrl' in formSelected && formSelected.publishedUrl) {
      return String(formSelected.publishedUrl);
    }

    if (typeof window !== 'undefined') {
      return `${window.location.origin}/fill-form/${formSelected.id}`;
    }

    return '';
  }, [formSelected]);

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

  // const handleInvite = () => {
  //   console.log('Invite email to form', {
  //     email: inviteEmail,
  //     formId: formSelected?.id,
  //     publishedUrl,
  //   });
  // };

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
                Different ways to share your form.
              </p>
            </div>
          </div>
        </header>

        <section className="qf-surface overflow-hidden">
          <div className="px-6 py-8">
            <div className="space-y-6">
              <div className="qf-surface-muted p-5">
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info text-info-foreground">
                      <LinkIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        Direct Link of Your Form
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your form can be shared publicly using this address.
                      </p>
                    </div>
                  </div>
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
              {/* 
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
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormPublishPage;
