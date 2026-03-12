import { Button } from '@/common/libs/ui/button';
import {
  AppliedFilterType,
  QuestionTypeFilterOptionType,
  QuestionTypeFiltersGroupType,
} from './filters.types';
import { useEffect, useMemo, useState } from 'react';
import { DynamicTableColumnType } from '../dynamic-table/dynamic-table.types';
import FilterValueInput from './FilterValueInput';

type FilterComposerProps = {
  columns: DynamicTableColumnType[];
  catalog: QuestionTypeFiltersGroupType[];
  onApply: (filter: AppliedFilterType) => void;
  onCancel: () => void;
};

const FilterComposer = ({
  columns,
  catalog,
  onApply,
  onCancel,
}: FilterComposerProps) => {
  const [selectedColumn, setSelectedColumn] = useState<
    DynamicTableColumnType | undefined
  >(undefined);
  const [operatorOptions, setOperatorOptions] = useState<
    QuestionTypeFilterOptionType[]
  >([]);
  const [selectedOperator, setSelectedOperator] = useState<
    QuestionTypeFilterOptionType | undefined
  >(undefined);
  const [value, setValue] = useState<string | number | boolean | null>(null);
  const [secondValue, setSecondValue] = useState<
    string | number | boolean | null
  >(null);

  const handleSelectColumn = (columnKey: string) => {
    const column = columns.find((column) => column.key === columnKey);
    setSelectedColumn(column);
  };

  useEffect(() => {
    if (selectedColumn) {
      const operators =
        catalog.find(
          (item) => item.questionTypeKey === selectedColumn.questionTypeKey
        )?.operators ?? [];
      setOperatorOptions(operators);
    }
  }, [selectedColumn, setOperatorOptions, catalog]);

  const handleSelectedOperator = (operatorId: string) => {
    const operator = operatorOptions.find(
      (operator) => operator.id === operatorId
    );
    setSelectedOperator(operator);
  };

  const handleApply = () => {
    if (!selectedColumn) {
      return;
    }
    if (!selectedOperator) {
      return;
    }

    const object: AppliedFilterType = {
      id: crypto.randomUUID(),
      columnKey: selectedColumn.key,
      columnLabel: selectedColumn.label,
      questionTypeId: selectedColumn.questionTypeId,
      questionTypeKey: selectedColumn.questionTypeKey,
      operatorId: selectedOperator.id,
      operatorKey: selectedOperator.key,
      operatorLabel: selectedOperator.label,
      uiControlType: selectedOperator.uiControlType,
      value: value,
      secondValue: secondValue,
    };
    onApply(object);
  };

  const canApply = useMemo(() => {
    if (!selectedColumn) {
      return false;
    }
    if (!selectedOperator) {
      return false;
    }
    if (selectedOperator.uiControlType === 'none') {
      return true;
    }
    if (
      selectedOperator.uiControlType === 'range-number' ||
      selectedOperator.uiControlType === 'range-date' ||
      selectedOperator.uiControlType === 'range-datetime' ||
      selectedOperator.uiControlType === 'range-time'
    ) {
      if (value && secondValue) {
        return true;
      }
      return false;
    }
    if (value) {
      return true;
    }
    return false;
  }, [selectedColumn, selectedOperator, value, secondValue]);

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
            value={selectedColumn?.key}
            onChange={(event) => {
              const columnKey = event.target.value;
              handleSelectColumn(columnKey);
            }}
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
            value={selectedOperator?.id}
            onChange={(event) => handleSelectedOperator(event.target.value)}
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
                value={value}
                secondValue={secondValue}
                onChange={(value) => setValue(value)}
                onSecondChange={(secondValue) => setSecondValue(secondValue)}
              />
            </>
          )}
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-3">
            <Button type="button" onClick={handleApply} disabled={!canApply}>
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
