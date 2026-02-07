import FormBuilderView from '@/modules/form/containers/FormBuilderView';

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return <FormBuilderView idForm={id} />;
}

export default BuilderPage;
