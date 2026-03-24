'use client';

import { useMemo, useRef, useState, useEffect } from 'react';

export type SelectOptionType = {
  key: string;
  value: string;
};

type MultiSelectWithCheckboxProps = {
  options: SelectOptionType[];
  value: SelectOptionType[];
  onChange: (value: SelectOptionType[]) => void;
  placeholder?: string;
};

const MultiSelectWithCheckbox = ({
  options,
  value,
  onChange,
  placeholder = 'Select options',
}: MultiSelectWithCheckboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedKeys = useMemo(
    () => new Set(value.map((item) => item.key)),
    [value]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleOption = (option: SelectOptionType) => {
    const exists = selectedKeys.has(option.key);

    if (exists) {
      onChange(value.filter((item) => item.key !== option.key));
      return;
    }

    onChange([...value, option]);
  };

  const buttonText =
    value.length > 0 ? value.map((item) => item.value).join(', ') : placeholder;

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="qf-select flex min-h-10 w-full items-center justify-between px-3 py-2 text-left"
      >
        <span
          className={value.length ? 'text-foreground' : 'text-muted-foreground'}
        >
          {buttonText}
        </span>
        <span className="text-muted-foreground">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-md border bg-background p-2 shadow-md">
          <div className="space-y-1">
            {options.map((option) => {
              const isChecked = selectedKeys.has(option.key);

              return (
                <label
                  key={option.key}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-muted"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleOption(option)}
                  />
                  <span>{option.value}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectWithCheckbox;
