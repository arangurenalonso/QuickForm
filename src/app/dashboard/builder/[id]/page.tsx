import FormBuilder from '@/components/form-designer/FormBuilder';

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  console.log('id', id);

  return <FormBuilder />;
}

export default BuilderPage;
