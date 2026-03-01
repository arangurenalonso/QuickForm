import FormSubmissionView from '@/modules/form/containers/FormSubmissionView';

async function FormFillPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  return (
    <>
      <FormSubmissionView idForm={id} />
    </>
  );
}

export default FormFillPage;
