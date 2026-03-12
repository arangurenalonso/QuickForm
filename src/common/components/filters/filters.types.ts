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
  | 'range-time';

export type QuestionTypeFilterOptionType = {
  id: string;
  key: string;
  label: string;
  uiControlType: UiControlType;
  uiControlLabel: string;
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
  value?: string | number | boolean | null;
  secondValue?: string | number | boolean | null;
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
  value?: string | number | boolean | null | undefined;
  secondValue?: string | number | boolean | null | undefined;
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
