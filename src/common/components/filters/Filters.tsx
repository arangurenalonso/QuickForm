'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
import {
  AppliedFilterType,
  QuestionTypeFiltersGroupType,
} from './filters.types';
import { DynamicTableColumnType } from '../dynamic-table/dynamic-table.types';

type FiltersProps = {
  columns: DynamicTableColumnType[];
  catalog: QuestionTypeFiltersGroupType[];
  onApplyFilters: (filters: AppliedFilterType[]) => void;
};

const Filters = ({ columns, catalog, onApplyFilters }: FiltersProps) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<AppliedFilterType[]>([]);
  const visibleColumns = useMemo(() => getVisibleColumns(columns), [columns]);

  useEffect(() => {
    onApplyFilters(filters);
  }, [filters, onApplyFilters]);

  const handleApplyFilter = useCallback(
    (filter: AppliedFilterType) => {
      console.log('Applying filter:', filter);
      setFilters((previous) => [...previous, filter]);
      setOpen(false);
    },
    [setFilters, setOpen]
  );

  const handleRemoveFilter = useCallback(
    (filterId: string) => {
      setFilters((previous) =>
        previous.filter((filter) => filter.id !== filterId)
      );
    },
    [setFilters]
  );

  const handleClearAllFilters = useCallback(() => {
    setFilters([]);
  }, [setFilters]);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
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
              onApply={handleApplyFilter}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        {filters.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClearAllFilters}
            className="h-9 px-2 text-slate-500"
          >
            Clear all
          </Button>
        ) : null}
      </div>

      {filters.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              filter={filter}
              onRemove={() => handleRemoveFilter(filter.id)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default Filters;
