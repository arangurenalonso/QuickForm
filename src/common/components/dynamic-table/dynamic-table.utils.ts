import {
  DynamicTableColumnType,
  DynamicTablePinnedOffsetsType,
} from './dynamic-table.types';

export type ColumnSize = {
  minWidth: number;
  maxWidth: number;
  align: 'left' | 'center' | 'right';
};

const DEFAULT_SIZE: ColumnSize = {
  minWidth: 160,
  maxWidth: 240,
  align: 'left',
};

export function getColumnSize(column: DynamicTableColumnType): ColumnSize {
  switch (column.type) {
    case 'InputTypeText':
      return {
        minWidth: 180,
        maxWidth: 320,
        align: 'left',
      };

    case 'InputTypeInteger':
      return {
        minWidth: 110,
        maxWidth: 140,
        align: 'right',
      };

    case 'InputTypeDecimal':
      return {
        minWidth: 130,
        maxWidth: 160,
        align: 'right',
      };

    case 'InputTypeDate':
      return {
        minWidth: 130,
        maxWidth: 150,
        align: 'left',
      };

    case 'InputTypeDatetime':
      return {
        minWidth: 180,
        maxWidth: 220,
        align: 'left',
      };

    case 'InputTypeTime':
      return {
        minWidth: 100,
        maxWidth: 120,
        align: 'left',
      };

    case 'InputTypeBoolean':
      return {
        minWidth: 100,
        maxWidth: 110,
        align: 'center',
      };

    default:
      return DEFAULT_SIZE;
  }
}

export function getAlignClass(align: ColumnSize['align']): string {
  switch (align) {
    case 'right':
      return 'text-right';
    case 'center':
      return 'text-center';
    default:
      return 'text-left';
  }
}

export function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '';

  return String(value);

  // if (type === 'InputTypeBoolean') {
  //   if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  //   return String(value);
  // }

  // if (type === 'InputTypeDecimal') {
  //   if (typeof value === 'number') {
  //     return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  //   }
  //   return String(value);
  // }

  // if (type === 'InputTypeInteger') {
  //   if (typeof value === 'number') return Math.trunc(value).toString();
  //   return String(value);
  // }

  // return String(value);
}

export function shouldTruncate(type: string): boolean {
  switch (type) {
    case 'InputTypeText':
    case 'InputTypeDate':
    case 'InputTypeDatetime':
    case 'InputTypeTime':
      return true;
    default:
      return false;
  }
}

export function getVisibleColumns(
  columns: DynamicTableColumnType[]
): DynamicTableColumnType[] {
  return columns.filter((column) => column.showInTable);
}

export function getOrderedVisibleColumns(
  columns: DynamicTableColumnType[]
): DynamicTableColumnType[] {
  const visibleColumns = getVisibleColumns(columns);
  const byOrder = (a: DynamicTableColumnType, b: DynamicTableColumnType) =>
    a.order - b.order;

  const leftPinned = visibleColumns
    .filter((column) => column.pinned === 'left')
    .sort(byOrder);

  const centerColumns = visibleColumns
    .filter((column) => !column.pinned)
    .sort(byOrder);

  const rightPinned = visibleColumns
    .filter((column) => column.pinned === 'right')
    .sort(byOrder);

  return [...leftPinned, ...centerColumns, ...rightPinned];
}

export function getPinnedOffsets(
  columns: DynamicTableColumnType[]
): DynamicTablePinnedOffsetsType {
  const orderedVisibleColumns = getOrderedVisibleColumns(columns);

  const leftOffsets: Record<string, number> = {};
  const rightOffsets: Record<string, number> = {};

  let accumulatedLeft = 0;
  for (const column of orderedVisibleColumns) {
    if (column.pinned === 'left') {
      leftOffsets[column.key] = accumulatedLeft;
      accumulatedLeft += getColumnSize(column).maxWidth;
    }
  }

  let accumulatedRight = 0;
  for (const column of [...orderedVisibleColumns].reverse()) {
    if (column.pinned === 'right') {
      rightOffsets[column.key] = accumulatedRight;
      accumulatedRight += getColumnSize(column).maxWidth;
    }
  }

  return { leftOffsets, rightOffsets };
}
