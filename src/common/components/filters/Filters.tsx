'use client';

import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/common/libs/ui/popover';
import { getVisibleColumns } from '@/common/components/dynamic-table/dynamic-table.utils';
import FilterChip from './FilterChip';
import FilterComposer from './FilterComposer';
import { FiltersProps } from './filters.types';
import { buildAppliedFilter, createEmptyDraft } from './filters.utils';

const Filters = ({
  columns,
  catalog,
  appliedFilters,
  onApplyFilter,
  onRemoveFilter,
  onClearAll,
}: FiltersProps) => {
  const visibleColumns = useMemo(() => getVisibleColumns(columns), [columns]);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(createEmptyDraft());

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setDraft(createEmptyDraft());
    }
  };

  const handleApply = () => {
    const nextFilter = buildAppliedFilter(visibleColumns, catalog, draft);

    if (!nextFilter) {
      return;
    }

    onApplyFilter(nextFilter);
    setDraft(createEmptyDraft());
    setOpen(false);
  };

  const handleCancel = () => {
    setDraft(createEmptyDraft());
    setOpen(false);
  };

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-9 rounded-full px-4"
            >
              <Plus size={16} className="mr-1" />
              Add filter
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            side="bottom"
            sideOffset={10}
            className="w-[min(560px,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-0 shadow-xl dark:border-slate-800 dark:bg-slate-950"
          >
            <FilterComposer
              columns={visibleColumns}
              catalog={catalog}
              draft={draft}
              onDraftChange={setDraft}
              onApply={handleApply}
              onCancel={handleCancel}
            />
          </PopoverContent>
        </Popover>

        {appliedFilters.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onClearAll}
            className="h-9 px-2 text-slate-500"
          >
            Clear all
          </Button>
        ) : null}
      </div>

      {appliedFilters.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {appliedFilters.map((filter) => (
            <FilterChip
              key={filter.id}
              filter={filter}
              onRemove={() => onRemoveFilter(filter.id)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default Filters;
