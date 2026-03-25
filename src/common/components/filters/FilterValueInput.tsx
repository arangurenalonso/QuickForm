import { Input } from '@/common/libs/ui/input';
import {
  FilterInputValueType,
  FilterPrimitiveValueType,
  SelectOptionType,
  UiControlType,
} from './filters.types';
import { NumericFormat } from 'react-number-format';
import { isSelectOptionArray } from './filters.utils';
import MultiSelectWithCheckbox from './Component/MultiSelectWithCheckbox';

type FilterValueInputProps = {
  uiControlType: UiControlType;
  value?: FilterInputValueType;
  secondValue?: FilterPrimitiveValueType;
  onChange: (value: FilterInputValueType) => void;
  onSecondChange: (value: FilterPrimitiveValueType) => void;
  options?: SelectOptionType[];
};

const FilterValueInput = ({
  uiControlType,
  value,
  secondValue,
  onChange,
  onSecondChange,
  options = [],
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
    const numericValue =
      typeof value === 'string' || typeof value === 'number' || value == null
        ? value
        : undefined;
    return (
      <NumericFormat
        value={numericValue}
        name={'number'}
        placeholder="Enter a number"
        onValueChange={(values) => {
          onChange(values.floatValue ?? null);
        }}
        className="flex-1 bg-transparent placeholder:text-muted-foreground"
        customInput={Input}
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
    const dateTimeValue = typeof value === 'string' ? value : '';
    return (
      <Input
        type="datetime-local"
        value={dateTimeValue}
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

  if (uiControlType === 'select') {
    return (
      <select
        value={value == null ? '' : String(value)}
        onChange={(event) => {
          const selectedValue = event.target.value;
          if (selectedValue === '') {
            onChange(null);
            return;
          }

          const selectedOption = options.find(
            (option) => String(option.key) === selectedValue
          );

          onChange(selectedOption ?? null);
        }}
        className="qf-select"
      >
        <option value="">Select value</option>

        {options.map((option) => (
          <option key={String(option.key)} value={String(option.key)}>
            {option.value}
          </option>
        ))}
      </select>
    );
  }

  if (uiControlType === 'multi-select') {
    const selectedOptions = isSelectOptionArray(value) ? value : [];

    return (
      <MultiSelectWithCheckbox
        options={options}
        value={selectedOptions}
        onChange={onChange}
        placeholder="Select values"
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
