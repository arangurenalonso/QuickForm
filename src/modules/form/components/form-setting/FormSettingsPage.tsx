'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Settings, LayoutTemplate } from 'lucide-react';
import StatusBadge from '@/common/components/molecules/StatusBadge';
import useFormStore from '@/modules/form/hooks/useFormStore';
import FormEditorForm from '../dashboard/form/FormEditorForm';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import { FORM_ACTION } from '../../enum/form.enum';
import PublishFormBtn from '../form-designer/component/navbar/navbar-btn/publish/PublishFormBtn';
import PreviewDialogBtn from '../form-designer/component/navbar/navbar-btn/preview/PreviewDialogBtn';
import FormRenderModeSelector from './FormRenderModeSelector';
import { TypesRender } from '../../types/form.types';
import { SHOW_ERROR_TYPE } from '@/common/components/molecules/error/auth-error.enum';
import useAuthErrorModalWatcher from '@/common/components/molecules/error/useAuthErrorModalWatcher';
import { ModalErrorType } from '@/modules/ui/store/modal/modal.type';

const FormSettingsPage = () => {
  const {
    formSelected,
    editFormBasicInformation,
    handleGetTypesRender,
    updateRenderMode,
    error,
    canEdit,
  } = useFormStore();

  useAuthErrorModalWatcher({
    error,
    id: ModalErrorType.UPDATE_RENDER_MODE_ERROR,
    showErrorType: SHOW_ERROR_TYPE.Toast,
  });

  const [typesRender, setTypeRender] = useState<TypesRender[]>([]);

  const fetchTypesRender = useCallback(async () => {
    const types = await handleGetTypesRender();

    if (!types) {
      return;
    }
    setTypeRender(types);
  }, [handleGetTypesRender]);

  useEffect(() => {
    fetchTypesRender();
  }, [fetchTypesRender]);

  // replace this with your actual mutation / zustand action
  const handleUpdateRenderMode = useCallback(
    async (mode: TypesRender) => {
      if (!formSelected) return;
      await updateRenderMode(formSelected.id, mode.id);
    },
    [updateRenderMode, formSelected]
  );

  const formStatus = formSelected?.status;

  const submitSaveFormCallback = async (values: {
    name: string;
    description?: string;
  }) => {
    editFormBasicInformation(formSelected!.id, values.name, values.description);
  };
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
              submitCallback={submitSaveFormCallback}
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
                  renderMode={formSelected?.renderMode || undefined}
                  options={typesRender}
                  disabled={!canEdit}
                  onChange={handleUpdateRenderMode}
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
