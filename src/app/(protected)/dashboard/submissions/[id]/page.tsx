import FormSubmissionsView from '@/modules/form/containers/FormSubmissionsView';

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return <FormSubmissionsView idForm={id} />;
}

export default BuilderPage;
