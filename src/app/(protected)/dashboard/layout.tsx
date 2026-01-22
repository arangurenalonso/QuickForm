import Navbar from '@/modules/formbuilder/components/navbar/Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="grid h-dvh w-full grid-rows-[auto_1fr]">
      <header>
        <Navbar />
        <div className="border-b" />
      </header>
      <main className="min-h-0 overflow-hidden">{children}</main>
    </div>
  );
}

// <div className="flex min-h-dvh w-full flex-col">
//   <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//     <Navbar />
//     <div className="border-b" />
//   </header>
//   <main className="flex flex-1 min-h-0 w-full  ">{children}</main>
// </div>
