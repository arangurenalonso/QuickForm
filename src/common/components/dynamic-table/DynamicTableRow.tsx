import {
  DynamicTableColumnType,
  DynamicTableRowType,
} from './dynamic-table.types';
import DynamicTableCell from './DynamicTableCell';

type Props = {
  columns: DynamicTableColumnType[];
  row: DynamicTableRowType;
};

const DynamicTableRow = ({ columns, row }: Props) => {
  return (
    <tr className="odd:bg-white even:bg-slate-50/40 hover:bg-blue-50/40">
      {columns.map((column) => (
        <DynamicTableCell
          key={column.key}
          column={column}
          value={row[column.key]}
        />
      ))}
    </tr>
  );
};

export default DynamicTableRow;
