import { DynamicTableColumnType } from '@/common/components/dynamic-table/dynamic-table.types';

export type FilterOperatorType =
  | 'contains'
  | 'notContains'
  | 'equals'
  | 'notEquals'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'between'
  | 'before'
  | 'after'
  | 'on'
  | 'onOrBefore'
  | 'onOrAfter'
  | 'isTrue'
  | 'isFalse'
  | 'isEmpty'
  | 'isNotEmpty';

export type FilterValueKindType =
  | 'none'
  | 'text'
  | 'number'
  | 'date'
  | 'datetime'
  | 'time'
  | 'boolean'
  | 'range-number'
  | 'range-date'
  | 'range-datetime'
  | 'range-time';

export type FilterOperatorOptionType = {
  value: FilterOperatorType;
  label: string;
  valueKind: FilterValueKindType;
};

export type FilterItemType = {
  id: string;
  columnKey: string;
  operator: FilterOperatorType | '';
  value?: string | number | boolean | null;
  secondValue?: string | number | boolean | null;
};

export type FiltersProps = {
  columns: DynamicTableColumnType[];
  filters: FilterItemType[];
  onChange: (filters: FilterItemType[]) => void;
  onApply: () => void;
  onReset: () => void;
};
