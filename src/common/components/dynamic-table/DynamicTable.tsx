import clsx from 'clsx';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from './dynamic-table.types';
import DynamicTableHeader from './DynamicTableHeader';
import DynamicTableRow from './DynamicTableRow';
import {
  getOrderedVisibleColumns,
  getPinnedOffsets,
} from './dynamic-table.utils';
import DynamicTableEmptyState from './DynamicTableEmptyState ';

type DynamicTableProps = {
  columns: DynamicTableColumnType[];
  rows: DynamicTableRowType[];
  emptyMessage?: string;
  className?: string;
};

const DynamicTable = ({
  columns,
  rows,
  emptyMessage = 'No submissions found.',
  className,
}: DynamicTableProps) => {
  const columnsByOrder = [...columns].sort((a, b) => a.order - b.order);
  const visibleOrderedColumns = getOrderedVisibleColumns(columnsByOrder);
  const pinnedOffsets = getPinnedOffsets(visibleOrderedColumns);

  const rowKeyColumn =
    columnsByOrder.find((column) => column.isKey) ?? columnsByOrder[0];

  return (
    <div className={clsx('w-full min-w-0', className)}>
      <div className="w-full max-w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="w-max min-w-full border-separate border-spacing-0">
          <DynamicTableHeader
            columns={visibleOrderedColumns}
            pinnedOffsets={pinnedOffsets}
          />

          {rows.length === 0 ? (
            <DynamicTableEmptyState
              colSpan={visibleOrderedColumns.length}
              message={emptyMessage}
            />
          ) : (
            <tbody className="bg-white dark:bg-slate-900">
              {rows.map((row, index) => (
                <DynamicTableRow
                  key={String(
                    rowKeyColumn ? (row[rowKeyColumn.key] ?? index) : index
                  )}
                  columns={visibleOrderedColumns}
                  row={row}
                  pinnedOffsets={pinnedOffsets}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
