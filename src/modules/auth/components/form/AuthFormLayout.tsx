type AuthFormLayoutProps = {
  children: React.ReactNode;
};

const AuthFormLayout = ({ children }: AuthFormLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border bg-background p-6 shadow-sm">
      {children}
    </div>
  );
};
export default AuthFormLayout;
