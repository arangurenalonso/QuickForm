type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<LayoutProps>) {
  return <div className="w-full min-h-screen">{children}</div>;
}
