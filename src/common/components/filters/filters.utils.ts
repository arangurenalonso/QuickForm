import {
  DynamicTableColumnType,
  DynamicColumnType,
} from '@/common/components/dynamic-table/dynamic-table.types';
import { FilterOperatorOptionType, FilterItemType } from './filters.types';

const TEXT_OPERATORS: FilterOperatorOptionType[] = [
  { value: 'contains', label: 'Contains', valueKind: 'text' },
  { value: 'notContains', label: 'Does not contain', valueKind: 'text' },
  { value: 'equals', label: 'Equals', valueKind: 'text' },
  { value: 'notEquals', label: 'Does not equal', valueKind: 'text' },
  { value: 'startsWith', label: 'Starts with', valueKind: 'text' },
  { value: 'endsWith', label: 'Ends with', valueKind: 'text' },
  { value: 'isEmpty', label: 'Is empty', valueKind: 'none' },
  { value: 'isNotEmpty', label: 'Is not empty', valueKind: 'none' },
];

const NUMBER_OPERATORS: FilterOperatorOptionType[] = [
  { value: 'equals', label: 'Equals', valueKind: 'number' },
  { value: 'notEquals', label: 'Does not equal', valueKind: 'number' },
  { value: 'greaterThan', label: 'Greater than', valueKind: 'number' },
  {
    value: 'greaterThanOrEqual',
    label: 'Greater than or equal',
    valueKind: 'number',
  },
  { value: 'lessThan', label: 'Less than', valueKind: 'number' },
  {
    value: 'lessThanOrEqual',
    label: 'Less than or equal',
    valueKind: 'number',
  },
  { value: 'between', label: 'Between', valueKind: 'range-number' },
  { value: 'isEmpty', label: 'Is empty', valueKind: 'none' },
  { value: 'isNotEmpty', label: 'Is not empty', valueKind: 'none' },
];

const DATE_OPERATORS: FilterOperatorOptionType[] = [
  { value: 'on', label: 'On', valueKind: 'date' },
  { value: 'before', label: 'Before', valueKind: 'date' },
  { value: 'after', label: 'After', valueKind: 'date' },
  { value: 'onOrBefore', label: 'On or before', valueKind: 'date' },
  { value: 'onOrAfter', label: 'On or after', valueKind: 'date' },
  { value: 'between', label: 'Between', valueKind: 'range-date' },
  { value: 'isEmpty', label: 'Is empty', valueKind: 'none' },
  { value: 'isNotEmpty', label: 'Is not empty', valueKind: 'none' },
];

const DATETIME_OPERATORS: FilterOperatorOptionType[] = [
  { value: 'on', label: 'On', valueKind: 'datetime' },
  { value: 'before', label: 'Before', valueKind: 'datetime' },
  { value: 'after', label: 'After', valueKind: 'datetime' },
  { value: 'onOrBefore', label: 'On or before', valueKind: 'datetime' },
  { value: 'onOrAfter', label: 'On or after', valueKind: 'datetime' },
  { value: 'between', label: 'Between', valueKind: 'range-datetime' },
  { value: 'isEmpty', label: 'Is empty', valueKind: 'none' },
  { value: 'isNotEmpty', label: 'Is not empty', valueKind: 'none' },
];

const TIME_OPERATORS: FilterOperatorOptionType[] = [
  { value: 'equals', label: 'Equals', valueKind: 'time' },
  { value: 'before', label: 'Before', valueKind: 'time' },
  { value: 'after', label: 'After', valueKind: 'time' },
  { value: 'between', label: 'Between', valueKind: 'range-time' },
  { value: 'isEmpty', label: 'Is empty', valueKind: 'none' },
  { value: 'isNotEmpty', label: 'Is not empty', valueKind: 'none' },
];

const BOOLEAN_OPERATORS: FilterOperatorOptionType[] = [
  { value: 'isTrue', label: 'Is true', valueKind: 'none' },
  { value: 'isFalse', label: 'Is false', valueKind: 'none' },
  { value: 'isEmpty', label: 'Is empty', valueKind: 'none' },
  { value: 'isNotEmpty', label: 'Is not empty', valueKind: 'none' },
];

export function getOperatorsByColumnType(
  type: DynamicColumnType | string
): FilterOperatorOptionType[] {
  switch (type) {
    case 'InputTypeText':
      return TEXT_OPERATORS;

    case 'InputTypeInteger':
    case 'InputTypeDecimal':
      return NUMBER_OPERATORS;

    case 'InputTypeDate':
      return DATE_OPERATORS;

    case 'InputTypeDatetime':
      return DATETIME_OPERATORS;

    case 'InputTypeTime':
      return TIME_OPERATORS;

    case 'InputTypeBoolean':
      return BOOLEAN_OPERATORS;

    default:
      return TEXT_OPERATORS;
  }
}

export function getColumnByKey(
  columns: DynamicTableColumnType[],
  key: string
): DynamicTableColumnType | undefined {
  return columns.find((column) => column.key === key);
}

export function createEmptyFilter(): FilterItemType {
  return {
    id: crypto.randomUUID(),
    columnKey: '',
    operator: '',
    value: '',
    secondValue: '',
  };
}
