import FormsList from '@/modules/form/containers/FormsList';

async function BuilderPage() {
  return (
    <div className="h-full min-h-0 px-5 py-2 overflow-auto">
      <FormsList />
    </div>
  );
}

export default BuilderPage;
