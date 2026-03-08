import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

type PaginationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

const PaginationButton = ({
  active = false,
  className,
  ...props
}: PaginationButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-all duration-200',
        'border border-slate-200 bg-white text-slate-700',
        'hover:border-slate-300 hover:bg-slate-50',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200',
        'dark:hover:border-slate-600 dark:hover:bg-slate-800',
        active &&
          'border-blue-600 bg-blue-600 shadow-sm hover:bg-blue-700 hover:border-blue-700 dark:border-blue-500  dark:hover:bg-blue-600',
        className
      )}
      {...props}
    />
  );
};

export default PaginationButton;
