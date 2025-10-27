import { cn } from '@/common/libs/utils';

const InputRuleItem = ({
  pass,
  children,
}: {
  pass: boolean;
  children: React.ReactNode;
}) => {
  return (
    <li
      className={cn(
        'flex items-center gap-2 text-sm',
        pass ? 'text-green-600' : 'text-destructive'
      )}
    >
      <span
        className={cn(
          'h-2 w-2 rounded-full',
          pass ? 'bg-green-600' : 'bg-destructive'
        )}
      />
      <span>{children}</span>
    </li>
  );
};

export default InputRuleItem;
