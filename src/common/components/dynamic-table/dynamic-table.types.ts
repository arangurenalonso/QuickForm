export type DynamicColumnType =
  | 'InputTypeText'
  | 'InputTypeInteger'
  | 'InputTypeDecimal'
  | 'InputTypeDate'
  | 'InputTypeDatetime'
  | 'InputTypeTime'
  | 'InputTypeBoolean';

export type DynamicTablePinnedType = 'left' | 'right' | null;

export type DynamicTableColumnType = {
  key: string;
  label: string;
  order: number;
  questionTypeId: string;
  questionTypeKey: DynamicColumnType | string;
  isKey: boolean;
  showInTable: boolean;
  pinned?: DynamicTablePinnedType;
};

export type DynamicTableRowType = Record<string, unknown>;

export type DynamicSubmissionsTableProps = {
  columns: DynamicTableColumnType[];
  rows: DynamicTableRowType[];
  emptyMessage?: string;
  className?: string;
};

export type DynamicTablePinnedOffsetsType = {
  leftOffsets: Record<string, number>;
  rightOffsets: Record<string, number>;
};
