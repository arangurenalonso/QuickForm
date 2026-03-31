import FormSubmissionSuccessView from '@/modules/form/components/submit-form/FormSubmissionSuccessView';

type SuccessPageProps = {
  params: {
    id: string;
  };
};

export default function SuccessPage({ params }: SuccessPageProps) {
  return <FormSubmissionSuccessView idForm={params.id} />;
}
