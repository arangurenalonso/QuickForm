import { X } from 'lucide-react';
import { DynamicTableColumnType } from '@/common/components/dynamic-table/dynamic-table.types';
import { getColumnByKey, getOperatorsByColumnType } from './filters.utils';
import FilterValueInput from './FilterValueInput';
import { FilterItemType, FilterOperatorType } from './filters.types';

type FilterRowProps = {
  columns: DynamicTableColumnType[];
  filter: FilterItemType;
  onChange: (next: FilterItemType) => void;
  onRemove: () => void;
};

const selectClassName =
  'h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';

const FilterRow = ({ columns, filter, onChange, onRemove }: FilterRowProps) => {
  const selectedColumn = getColumnByKey(columns, filter.columnKey);
  const operatorOptions = selectedColumn
    ? getOperatorsByColumnType(selectedColumn.type)
    : [];

  const selectedOperator = operatorOptions.find(
    (operator) => operator.value === filter.operator
  );

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] dark:border-slate-700 dark:bg-slate-900">
      <select
        value={filter.columnKey}
        onChange={(event) =>
          onChange({
            ...filter,
            columnKey: event.target.value,
            operator: '',
            value: '',
            secondValue: '',
          })
        }
        className={selectClassName}
      >
        <option value="">Select column</option>
        {columns.map((column) => (
          <option key={column.key} value={column.key}>
            {column.label}
          </option>
        ))}
      </select>

      <select
        value={filter.operator}
        onChange={(event) =>
          onChange({
            ...filter,
            operator: event.target.value as FilterOperatorType,
            value: '',
            secondValue: '',
          })
        }
        disabled={!selectedColumn}
        className={selectClassName}
      >
        <option value="">Select operator</option>
        {operatorOptions.map((operator) => (
          <option key={operator.value} value={operator.value}>
            {operator.label}
          </option>
        ))}
      </select>

      <div>
        {selectedOperator ? (
          <FilterValueInput
            valueKind={selectedOperator.valueKind}
            value={filter.value}
            secondValue={filter.secondValue}
            onChange={(value) => onChange({ ...filter, value })}
            onSecondChange={(secondValue) =>
              onChange({ ...filter, secondValue })
            }
          />
        ) : null}
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        aria-label="Remove filter"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default FilterRow;
