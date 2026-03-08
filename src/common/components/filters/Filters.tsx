import { Plus, RotateCcw, Search } from 'lucide-react';
import { getVisibleColumns } from '@/common/components/dynamic-table/dynamic-table.utils';
import { FiltersProps } from './filters.types';
import { createEmptyFilter } from './filters.utils';
import FilterRow from './FilterRow';

const Filters = ({
  columns,
  filters,
  onChange,
  onApply,
  onReset,
}: FiltersProps) => {
  const visibleColumns = getVisibleColumns(columns);

  const handleAdd = () => {
    onChange([...filters, createEmptyFilter()]);
  };

  const handleUpdate = (id: string, nextFilter: (typeof filters)[number]) => {
    onChange(filters.map((filter) => (filter.id === id ? nextFilter : filter)));
  };

  const handleRemove = (id: string) => {
    onChange(filters.filter((filter) => filter.id !== id));
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Filters
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Filter submissions by column, operator, and value.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Plus size={16} />
            Add filter
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="button"
            onClick={onApply}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Search size={16} />
            Apply
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filters.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No filters added yet.
          </div>
        ) : (
          filters.map((filter) => (
            <FilterRow
              key={filter.id}
              columns={visibleColumns}
              filter={filter}
              onChange={(next) => handleUpdate(filter.id, next)}
              onRemove={() => handleRemove(filter.id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Filters;
