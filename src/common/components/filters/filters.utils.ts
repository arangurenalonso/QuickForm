import { DynamicTableColumnType } from '@/common/components/dynamic-table/dynamic-table.types';
import {
  AppliedFilterType,
  FilterDraftType,
  QuestionTypeFilterOptionType,
  QuestionTypeFiltersGroupType,
  UiControlType,
} from './filters.types';

export function createEmptyDraft(): FilterDraftType {
  return {
    columnKey: '',
    operatorId: '',
    value: '',
    secondValue: '',
  };
}

export function getColumnByKey(
  columns: DynamicTableColumnType[],
  key: string
): DynamicTableColumnType | undefined {
  return columns.find((column) => column.key === key);
}

export function getOperatorsByColumnType(
  catalog: QuestionTypeFiltersGroupType[],
  questionTypeKey: string
): QuestionTypeFilterOptionType[] {
  return (
    catalog.find((item) => item.questionTypeKey === questionTypeKey)
      ?.operators ?? []
  );
}

export function getOperatorById(
  catalog: QuestionTypeFiltersGroupType[],
  questionTypeKey: string,
  operatorId: string
): QuestionTypeFilterOptionType | undefined {
  return getOperatorsByColumnType(catalog, questionTypeKey).find(
    (operator) => operator.id === operatorId
  );
}

export function requiresValue(uiControlType: UiControlType): boolean {
  return uiControlType !== 'none';
}

export function buildAppliedFilter(
  columns: DynamicTableColumnType[],
  catalog: QuestionTypeFiltersGroupType[],
  draft: FilterDraftType
): AppliedFilterType | null {
  const selectedColumn = getColumnByKey(columns, draft.columnKey);

  if (!selectedColumn) {
    return null;
  }

  const selectedOperator = getOperatorById(
    catalog,
    selectedColumn.type,
    draft.operatorId
  );

  if (!selectedOperator) {
    return null;
  }

  return {
    id: crypto.randomUUID(),
    columnKey: selectedColumn.key,
    columnLabel: selectedColumn.label,
    questionTypeKey: selectedColumn.type,
    operatorId: selectedOperator.id,
    operatorKey: selectedOperator.key,
    operatorLabel: selectedOperator.label,
    uiControlType: selectedOperator.uiControlType,
    value: draft.value ?? '',
    secondValue: draft.secondValue ?? '',
  };
}

export function formatFilterValue(filter: AppliedFilterType): string {
  if (filter.uiControlType === 'none') {
    return '';
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

export function isDraftValid(
  columns: DynamicTableColumnType[],
  catalog: QuestionTypeFiltersGroupType[],
  draft: FilterDraftType
): boolean {
  const selectedColumn = getColumnByKey(columns, draft.columnKey);

  if (!selectedColumn || !draft.operatorId) {
    return false;
  }

  const selectedOperator = getOperatorById(
    catalog,
    selectedColumn.type,
    draft.operatorId
  );

  if (!selectedOperator) {
    return false;
  }

  if (!requiresValue(selectedOperator.uiControlType)) {
    return true;
  }

  if (
    selectedOperator.uiControlType === 'range-number' ||
    selectedOperator.uiControlType === 'range-date' ||
    selectedOperator.uiControlType === 'range-datetime' ||
    selectedOperator.uiControlType === 'range-time'
  ) {
    return (
      String(draft.value ?? '').trim().length > 0 &&
      String(draft.secondValue ?? '').trim().length > 0
    );
  }

  return String(draft.value ?? '').trim().length > 0;
}
