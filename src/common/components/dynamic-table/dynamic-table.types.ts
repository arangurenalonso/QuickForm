import { ReactNode } from 'react';

export type DynamicColumnType =
  | 'InputTypeText'
  | 'InputTypeInteger'
  | 'InputTypeDecimal'
  | 'InputTypeDate'
  | 'InputTypeDatetime'
  | 'InputTypeTime'
  | 'InputTypeBoolean'
  | 'Status'
  | 'Action';

export type DynamicTablePinnedType = 'left' | 'right' | null;

export type renderCellParamsType = {
  value: unknown;
  row: DynamicTableRowType;
  column: DynamicTableColumnType;
};

export type DynamicTableColumnType = {
  key: string;
  label: string;
  order: number;
  questionTypeId: string;
  questionTypeKey: DynamicColumnType | string;
  isKey: boolean;
  showInTable: boolean;
  pinned?: DynamicTablePinnedType;
  options?: { key: string; value: string }[];
  showInFilter: boolean;
  renderCell?: (params: renderCellParamsType) => ReactNode;
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
