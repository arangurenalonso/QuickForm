type DynamicTableEmptyStateProps = {
  colSpan: number;
  message: string;
};

const DynamicTableEmptyState = ({
  colSpan,
  message,
}: DynamicTableEmptyStateProps) => {
  return (
    <tbody className="bg-white dark:bg-slate-900">
      <tr>
        <td
          colSpan={colSpan}
          className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          {message}
        </td>
      </tr>
    </tbody>
  );
};

export default DynamicTableEmptyState;
