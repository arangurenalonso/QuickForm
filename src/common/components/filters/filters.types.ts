import { DynamicTableColumnType } from '@/common/components/dynamic-table/dynamic-table.types';

export type UiControlType =
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
  | 'range-time'
  | 'select'
  | 'multi-select';

export type SelectOptionType = {
  key: string;
  value: string;
};

export type FilterPrimitiveValueType =
  | string
  | number
  | boolean
  | null
  | undefined;

export type FilterInputValueType =
  | FilterPrimitiveValueType
  | SelectOptionType
  | SelectOptionType[];

export type QuestionTypeFilterOptionType = {
  id: string;
  key: string;
  label: string;
  uiControlType: UiControlType;
  uiControlLabel: string;
  options?: SelectOptionType[];
};

export type QuestionTypeFiltersGroupType = {
  questionTypeId: string;
  questionTypeKey: string;
  questionTypeLabel: string;
  operators: QuestionTypeFilterOptionType[];
};

export type FilterDraftType = {
  columnKey: string;
  operatorId: string;
  value?: FilterInputValueType;
  secondValue?: FilterPrimitiveValueType;
};

export type AppliedFilterType = {
  id: string;
  columnKey: string;
  columnLabel: string;
  questionTypeId: string;
  questionTypeKey: string;
  operatorId: string;
  operatorKey: string;
  operatorLabel: string;
  uiControlType: UiControlType;
  value?: FilterInputValueType;
  secondValue?: FilterPrimitiveValueType;
};

export type FilterComposerProps = {
  columns: DynamicTableColumnType[];
  catalog: QuestionTypeFiltersGroupType[];
  draft: FilterDraftType;
  onDraftChange: (draft: FilterDraftType) => void;
  onApply: () => void;
  onCancel: () => void;
};

export type FilterChipProps = {
  filter: AppliedFilterType;
  onRemove: () => void;
};
