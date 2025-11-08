import Navbar from '@/modules/formbuilder/components/navbar/Navbar';
import VerticalGrowContainer from '@/modules/formbuilder/components/template/VerticalGrowContainer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full max-w-7xl mx-auto">
      <VerticalGrowContainer topElement={<Navbar />}>
        {children}
      </VerticalGrowContainer>
    </div>
  );
}
