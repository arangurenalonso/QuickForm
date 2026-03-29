type CardAlertProps = {
  title: string;
  description: string;
};

const CardAlert = ({ title, description }: CardAlertProps) => {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default CardAlert;
