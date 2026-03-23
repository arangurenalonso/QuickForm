'use client';

import React from 'react';
import { Settings, ChevronRight, FileCheck2 } from 'lucide-react';
import StatusBadge from '@/common/components/molecules/StatusBadge';
import useFormStore from '@/modules/form/hooks/useFormStore';
import FormEditorForm from '../dashboard/form/FormEditorForm';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import { FORM_ACTION } from '../../enum/form.enum';
import PublishFormBtn from '../form-designer/component/navbar/navbar-btn/publish/PublishFormBtn';
import PreviewDialogBtn from '../form-designer/component/navbar/navbar-btn/preview/PreviewDialogBtn';

const FormSettingsPage = () => {
  const { formSelected } = useFormStore();

  const formStatus = formSelected?.status;

  return (
    <div className="min-h-full bg-muted/30 p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
              <Settings className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                  Form Settings
                </h1>

                {formStatus && <StatusBadge status={formStatus} size="sm" />}
              </div>

              <p className="text-sm text-muted-foreground">
                Customize form status and properties
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start">
            <PreviewDialogBtn />

            {formSelected && (
              <ActionGuard
                currentActions={formSelected.status.allowedActions}
                allowedActions={[FORM_ACTION.Publish]}
              >
                <PublishFormBtn idForm={formSelected.id} />
              </ActionGuard>
            )}
          </div>
        </header>

        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="border-b px-6 py-8">
            <FormEditorForm
              canEdit={
                formSelected
                  ? formSelected.status.allowedActions.includes(
                      FORM_ACTION.Edit
                    )
                  : false
              }
              initialValues={
                formSelected
                  ? {
                      name: formSelected.name,
                      description: formSelected.description,
                    }
                  : undefined
              }
            />
          </div>
          <div className="px-6 py-8">
            <div className="max-w-3xl space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">
                  Form Status
                </h2>
                <p className="text-sm text-muted-foreground">
                  Enable, disable, or conditionally enable your form
                </p>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl border bg-background px-4 py-4 text-left transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-white">
                    <FileCheck2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-base font-semibold uppercase tracking-wide text-green-600">
                      Enabled
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your form is currently visible and able to receive
                      submissions
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormSettingsPage;
