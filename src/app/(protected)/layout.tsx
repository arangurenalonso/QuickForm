type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<AuthLayoutProps>) {
  return <div className="w-full min-h-screen">{children}</div>;
}
