// src/modules/form/components/form-render/FormPreviewRenderer.tsx
'use client';

import RenderDefaultForm from './RenderDefaultForm';
import RenderTabsForm from './RenderTabsForm';
import RenderAccordionForm from './RenderAccordionForm';
import RenderStepperForm from './stepper/RenderStepperForm';
import { SectionType } from '../../store/designer/designer.model';
import { FormRenderMode } from './type/form-rende.type';

type FormPreviewRendererProps = {
  mode?: FormRenderMode;
  sections: SectionType[];
  onSubmit?: (values: unknown) => void;
};

const FormPreviewRenderer = ({
  mode = 'default',
  sections,
  onSubmit,
}: FormPreviewRendererProps) => {
  switch (mode) {
    case 'tabs':
      return <RenderTabsForm sections={sections} onSubmit={onSubmit} />;

    case 'accordion':
      return <RenderAccordionForm sections={sections} onSubmit={onSubmit} />;

    case 'stepper':
      return <RenderStepperForm sections={sections} onSubmit={onSubmit} />;

    case 'default':
    default:
      return <RenderDefaultForm sections={sections} onSubmit={onSubmit} />;
  }
};

export default FormPreviewRenderer;
