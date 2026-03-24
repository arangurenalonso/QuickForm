type FormListHeaderProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

const FormListHeader = ({
  title,
  description,
  action,
}: FormListHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
      {action ? <div className="flex items-center gap-3">{action}</div> : null}
    </div>
  );
};

export default FormListHeader;
