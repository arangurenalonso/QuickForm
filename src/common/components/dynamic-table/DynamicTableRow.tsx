import {
  DynamicTableColumnType,
  DynamicTablePinnedOffsetsType,
  DynamicTableRowType,
} from './dynamic-table.types';
import DynamicTableCell from './DynamicTableCell';

type Props = {
  columns: DynamicTableColumnType[];
  row: DynamicTableRowType;
  pinnedOffsets: DynamicTablePinnedOffsetsType;
};

const DynamicTableRow = ({ columns, row, pinnedOffsets }: Props) => {
  return (
    <tr
      className="
        group bg-[var(--row-bg)] transition-colors
        [--row-bg:#ffffff]
        even:[--row-bg:#f8fafc]
        hover:[--row-bg:#eff6ff]
        dark:[--row-bg:#0f172a]
        dark:even:[--row-bg:#1e293b]
        dark:hover:[--row-bg:#172554]
      "
    >
      {columns.map((column) => (
        <DynamicTableCell
          key={column.key}
          column={column}
          row={row}
          value={row[column.key]}
          pinnedOffsets={pinnedOffsets}
        />
      ))}
    </tr>
  );
};

export default DynamicTableRow;
