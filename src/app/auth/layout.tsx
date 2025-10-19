type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-0">
      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  );
}
