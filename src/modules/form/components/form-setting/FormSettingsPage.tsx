'use client';

import React, { useMemo } from 'react';
import { Settings, LayoutTemplate } from 'lucide-react';
import StatusBadge from '@/common/components/molecules/StatusBadge';
import useFormStore from '@/modules/form/hooks/useFormStore';
import FormEditorForm from '../dashboard/form/FormEditorForm';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import { FORM_ACTION } from '../../enum/form.enum';
import PublishFormBtn from '../form-designer/component/navbar/navbar-btn/publish/PublishFormBtn';
import PreviewDialogBtn from '../form-designer/component/navbar/navbar-btn/preview/PreviewDialogBtn';
import FormRenderModeSelector from './FormRenderModeSelector';
import { FormRenderMode } from '../form-render/type/form-rende.type';

const FormSettingsPage = () => {
  const { formSelected } = useFormStore();

  // replace this with your actual mutation / zustand action
  const updateRenderMode = (mode: FormRenderMode) => {
    console.log('save render mode', mode);
  };

  const formStatus = formSelected?.status;

  const canEdit = useMemo(() => {
    return formSelected
      ? formSelected.status.allowedActions.includes(FORM_ACTION.Edit)
      : false;
  }, [formSelected]);

  const selectedRenderMode =
    (formSelected?.renderMode as FormRenderMode | undefined) ?? 'default';

  return (
    <div className="h-full overflow-auto bg-muted/30 p-6 ">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning text-warning-foreground shadow-sm">
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
                Configure how your form behaves and how people will experience
                it.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start">
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

        <section className="qf-surface overflow-hidden">
          <div className="border-b px-6 py-8">
            <FormEditorForm
              canEdit={canEdit}
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

          <div className="border-b px-6 py-8">
            <div className="w-full space-y-4">
              <div className="space-y-1">
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Render Type
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Choose the layout your users will see when filling the
                      form.
                    </p>
                  </div>

                  <div className="justify-self-start md:justify-self-end">
                    <PreviewDialogBtn />
                  </div>
                </div>
              </div>

              <div className="qf-surface-muted p-4 md:p-5">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info text-info-foreground">
                    <LayoutTemplate className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Experience preset
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This becomes the default preview and the default published
                      layout.
                    </p>
                  </div>
                </div>

                <FormRenderModeSelector
                  value={selectedRenderMode}
                  disabled={!canEdit}
                  onChange={updateRenderMode}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormSettingsPage;
