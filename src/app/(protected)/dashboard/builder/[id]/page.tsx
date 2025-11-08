import NavbarDesigner from '@/modules/formbuilder/components/form-designer/navbar/NavbarDesigner';
import VerticalGrowContainer from '@/modules/formbuilder/components/template/VerticalGrowContainer';
import dynamic from 'next/dynamic';

const DynamicHeavyComponents = dynamic(
  () => import('@/modules/formbuilder/components/form-designer/FormBuilder'),
  { loading: () => <div>Chart…</div>, ssr: false }
);
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
      <DynamicHeavyComponents />
    </VerticalGrowContainer>
  );
}

export default BuilderPage;
