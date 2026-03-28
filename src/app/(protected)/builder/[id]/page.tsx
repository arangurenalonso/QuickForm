import FormBuilderView from '@/modules/form/containers/FormBuilderView';
import { FormWorkspaceTab } from '@/modules/form/enum/form.enum';

async function BuilderPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;

  return <FormBuilderView idForm={id} tab={tab ?? FormWorkspaceTab.builder} />;
}

export default BuilderPage;
