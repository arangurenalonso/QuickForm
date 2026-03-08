import { FilterValueKindType } from './filters.types';

type FilterValueInputProps = {
  valueKind: FilterValueKindType;
  value?: string | number | boolean | null;
  secondValue?: string | number | boolean | null;
  onChange: (value: string | number | boolean | null) => void;
  onSecondChange: (value: string | number | boolean | null) => void;
};

const baseInputClassName =
  'h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';

const FilterValueInput = ({
  valueKind,
  value,
  secondValue,
  onChange,
  onSecondChange,
}: FilterValueInputProps) => {
  if (valueKind === 'none') {
    return null;
  }

  if (valueKind === 'text') {
    return (
      <input
        type="text"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
        className={baseInputClassName}
        placeholder="Enter value"
      />
    );
  }

  if (valueKind === 'number') {
    return (
      <input
        type="number"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
        className={baseInputClassName}
        placeholder="Enter number"
      />
    );
  }

  if (valueKind === 'date') {
    return (
      <input
        type="date"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
        className={baseInputClassName}
      />
    );
  }

  if (valueKind === 'datetime') {
    return (
      <input
        type="datetime-local"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
        className={baseInputClassName}
      />
    );
  }

  if (valueKind === 'time') {
    return (
      <input
        type="time"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
        className={baseInputClassName}
      />
    );
  }

  if (
    valueKind === 'range-number' ||
    valueKind === 'range-date' ||
    valueKind === 'range-datetime' ||
    valueKind === 'range-time'
  ) {
    const inputType =
      valueKind === 'range-number'
        ? 'number'
        : valueKind === 'range-date'
          ? 'date'
          : valueKind === 'range-datetime'
            ? 'datetime-local'
            : 'time';

    return (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <input
          type={inputType}
          value={String(value ?? '')}
          onChange={(event) => onChange(event.target.value)}
          className={baseInputClassName}
          placeholder="From"
        />
        <input
          type={inputType}
          value={String(secondValue ?? '')}
          onChange={(event) => onSecondChange(event.target.value)}
          className={baseInputClassName}
          placeholder="To"
        />
      </div>
    );
  }

  return null;
};

export default FilterValueInput;
