import clsx from 'clsx';
import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from './dynamic-table.types';
import DynamicTableHeader from './DynamicTableHeader';
import DynamicTableRow from './DynamicTableRow';

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
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <div className={clsx('w-full', className)}>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-max min-w-full border-separate border-spacing-0">
          <DynamicTableHeader columns={sortedColumns} />

          <tbody className="bg-white">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={sortedColumns.length}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <DynamicTableRow
                  key={String(row.submissionId ?? index)}
                  columns={sortedColumns}
                  row={row}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
