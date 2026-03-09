import { X } from 'lucide-react';
import { FilterChipProps } from './filters.types';
import { formatFilterValue } from './filters.utils';

const FilterChip = ({ filter, onRemove }: FilterChipProps) => {
  const value = formatFilterValue(filter);

  return (
    <div className="qf-chip">
      <span className="font-medium">{filter.columnLabel}</span>
      <span className="text-slate-400">•</span>
      <span>{filter.operatorLabel}</span>
      {value ? (
        <>
          <span className="text-slate-400">•</span>
          <span>{value}</span>
        </>
      ) : null}

      <button
        type="button"
        onClick={onRemove}
        className="qf-chip-button"
        aria-label={`Remove filter ${filter.columnLabel}`}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default FilterChip;
