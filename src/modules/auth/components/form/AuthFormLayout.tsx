type AuthFormLayoutProps = {
  children: React.ReactNode;
};

const AuthFormLayout = ({ children }: AuthFormLayoutProps) => {
  return (
    <div
      className="
        mx-auto w-full max-w-md
        rounded-none border-0
        md:rounded-2xl md:border md:border-border
        bg-background p-6 md:shadow-sm
      "
    >
      {children}
    </div>
  );
};

export default AuthFormLayout;
