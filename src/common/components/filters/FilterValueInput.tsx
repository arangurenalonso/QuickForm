import { Input } from '@/common/libs/ui/input';
import { UiControlType } from './filters.types';

type FilterValueInputProps = {
  uiControlType: UiControlType;
  value?: string | number | boolean | null;
  secondValue?: string | number | boolean | null;
  onChange: (value: string | number | boolean | null) => void;
  onSecondChange: (value: string | number | boolean | null) => void;
};

const FilterValueInput = ({
  uiControlType,
  value,
  secondValue,
  onChange,
  onSecondChange,
}: FilterValueInputProps) => {
  if (uiControlType === 'none') {
    return null;
  }

  if (uiControlType === 'text') {
    return (
      <Input
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter value"
      />
    );
  }

  if (uiControlType === 'number') {
    return (
      <Input
        type="number"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter number"
      />
    );
  }

  if (uiControlType === 'date') {
    return (
      <Input
        type="date"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (uiControlType === 'datetime') {
    return (
      <Input
        type="datetime-local"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (uiControlType === 'time') {
    return (
      <Input
        type="time"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (
    uiControlType === 'range-number' ||
    uiControlType === 'range-date' ||
    uiControlType === 'range-datetime' ||
    uiControlType === 'range-time'
  ) {
    const inputType =
      uiControlType === 'range-number'
        ? 'number'
        : uiControlType === 'range-date'
          ? 'date'
          : uiControlType === 'range-datetime'
            ? 'datetime-local'
            : 'time';

    return (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Input
          type={inputType}
          value={String(value ?? '')}
          onChange={(event) => onChange(event.target.value)}
          placeholder="From"
        />
        <Input
          type={inputType}
          value={String(secondValue ?? '')}
          onChange={(event) => onSecondChange(event.target.value)}
          placeholder="To"
        />
      </div>
    );
  }

  if (uiControlType === 'boolean') {
    return (
      <select
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
        className="qf-select"
      >
        <option value="">Select value</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    );
  }

  return null;
};

export default FilterValueInput;
