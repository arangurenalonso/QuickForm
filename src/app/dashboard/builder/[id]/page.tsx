import FormBuilder from '@/components/form-designer/FormBuilder';
import NavbarDesigner from '@/components/form-designer/navbar/NavbarDesigner';
import VerticalGrowContainer from '@/components/template/VerticalGrowContainer';

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  console.log('id', id);

  return (
    <VerticalGrowContainer topElement={<NavbarDesigner />}>
      <FormBuilder />
    </VerticalGrowContainer>
  );
}

export default BuilderPage;
