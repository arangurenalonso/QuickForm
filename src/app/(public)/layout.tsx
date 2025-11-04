type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<PublicLayoutProps>) {
  return <div className="w-full min-h-screen">{children}</div>;
}
