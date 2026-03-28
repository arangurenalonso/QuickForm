'use client';

import RenderDefaultForm from './RenderDefaultForm';
import RenderTabsForm from './RenderTabsForm';
import RenderAccordionForm from './RenderAccordionForm';
import RenderStepperForm from './stepper/RenderStepperForm';
import { SectionType } from '../form-designer/context/designer-context.type';
import { RenderMode } from '../../types/form.types';
import { FORM_RENDER_TYPE_DATA } from '../../utils/form.method';

type FormPreviewRendererProps = {
  mode?: RenderMode;
  sections: SectionType[];
  onSubmit?: (values: unknown) => void;
};

const FormPreviewRenderer = ({
  mode,
  sections,
  onSubmit,
}: FormPreviewRendererProps) => {
  switch (mode?.id.toUpperCase()) {
    case FORM_RENDER_TYPE_DATA.Tabs.id:
      return <RenderTabsForm sections={sections} onSubmit={onSubmit} />;

    case FORM_RENDER_TYPE_DATA.Accordion.id:
      return <RenderAccordionForm sections={sections} onSubmit={onSubmit} />;

    case FORM_RENDER_TYPE_DATA.Stepper.id:
      return <RenderStepperForm sections={sections} onSubmit={onSubmit} />;

    case FORM_RENDER_TYPE_DATA.Default.id:
    default:
      return <RenderDefaultForm sections={sections} onSubmit={onSubmit} />;
  }
};

export default FormPreviewRenderer;
