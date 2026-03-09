import { Button } from '@/common/libs/ui/button';
import { FilterComposerProps } from './filters.types';
import {
  getColumnByKey,
  getOperatorById,
  getOperatorsByColumnType,
  isDraftValid,
} from './filters.utils';
import FilterValueInput from './FilterValueInput';

const FilterComposer = ({
  columns,
  catalog,
  draft,
  onDraftChange,
  onApply,
  onCancel,
}: FilterComposerProps) => {
  const selectedColumn = getColumnByKey(columns, draft.columnKey);

  const operatorOptions = selectedColumn
    ? getOperatorsByColumnType(catalog, selectedColumn.type)
    : [];

  const selectedOperator = selectedColumn
    ? getOperatorById(catalog, selectedColumn.type, draft.operatorId)
    : undefined;

  const canApply = isDraftValid(columns, catalog, draft);

  return (
    <div className="p-5">
      <div className="mb-5">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Filter results
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="qf-field-label">Filter</label>
          <select
            value={draft.columnKey}
            onChange={(event) =>
              onDraftChange({
                columnKey: event.target.value,
                operatorId: '',
                value: '',
                secondValue: '',
              })
            }
            className="qf-select"
          >
            <option value="">Select options</option>
            {columns.map((column) => (
              <option key={column.key} value={column.key}>
                {column.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="qf-field-label">Operator</label>
          <select
            value={draft.operatorId}
            onChange={(event) =>
              onDraftChange({
                ...draft,
                operatorId: event.target.value,
                value: '',
                secondValue: '',
              })
            }
            disabled={!selectedColumn}
            className="qf-select"
          >
            <option value="">Select operator</option>
            {operatorOptions.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          {selectedOperator && (
            <>
              <label className="qf-field-label">Value</label>
              <FilterValueInput
                uiControlType={selectedOperator.uiControlType}
                value={draft.value}
                secondValue={draft.secondValue}
                onChange={(value) => onDraftChange({ ...draft, value })}
                onSecondChange={(secondValue) =>
                  onDraftChange({ ...draft, secondValue })
                }
              />
            </>
          )}
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-3">
            <Button type="button" onClick={onApply} disabled={!canApply}>
              Apply
            </Button>

            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComposer;
