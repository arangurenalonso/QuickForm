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
        pass
          ? 'text-green-700 dark:text-green-400'
          : 'text-red-700 dark:text-red-400'
      )}
    >
      <span
        className={cn(
          'h-2 w-2 rounded-full',
          pass ? 'bg-green-600 dark:bg-green-400' : 'bg-red-600 dark:bg-red-400'
        )}
      />
      <span>{children}</span>
    </li>
  );
};

export default InputRuleItem;
