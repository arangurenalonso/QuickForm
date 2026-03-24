import {
  AppliedFilterType,
  FilterInputValueType,
  SelectOptionType,
  UiControlType,
} from './filters.types';

export function formatFilterValue(filter: AppliedFilterType): string {
  if (filter.uiControlType === 'none') {
    return '';
  }

  if (
    filter.uiControlType === 'select' &&
    filter.value &&
    isSelectOption(filter.value)
  ) {
    return filter.value.value;
  }

  if (
    filter.uiControlType === 'multi-select' &&
    filter.value &&
    isSelectOptionArray(filter.value)
  ) {
    return filter.value.map((item) => item.value).join(', ');
  }
  if (
    filter.uiControlType === 'range-number' ||
    filter.uiControlType === 'range-date' ||
    filter.uiControlType === 'range-datetime' ||
    filter.uiControlType === 'range-time'
  ) {
    const left = String(filter.value ?? '').trim();
    const right = String(filter.secondValue ?? '').trim();

    if (!left && !right) {
      return '';
    }

    return `${left} – ${right}`.trim();
  }

  return String(filter.value ?? '').trim();
}

export const isSelectOption = (value: unknown): value is SelectOptionType => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'key' in value &&
    'value' in value &&
    typeof value.key === 'string' &&
    typeof value.value === 'string'
  );
};

export const isSelectOptionArray = (
  value: unknown
): value is SelectOptionType[] => {
  return Array.isArray(value) && value.every(isSelectOption);
};

export const normalizeFilterValue = (
  uiControlType: UiControlType,
  value: FilterInputValueType
): FilterInputValueType => {
  if (uiControlType === 'select' && isSelectOption(value)) {
    return value.key;
  }

  if (uiControlType === 'multi-select' && isSelectOptionArray(value)) {
    return value.map((item) => item.key).join(', ');
  }

  return value as FilterInputValueType;
};
