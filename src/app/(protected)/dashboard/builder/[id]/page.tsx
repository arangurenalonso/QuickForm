import FormBuilderView from '@/modules/formbuilder/form-designer/containers/FormBuilderView';

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  console.log('id', id);

  return <FormBuilderView id={id} />;
}

export default BuilderPage;
