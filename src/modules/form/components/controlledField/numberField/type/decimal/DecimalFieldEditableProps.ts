export default interface DecimalFieldEditableProps {
  name: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  informationText?: string;
  icon?: React.ElementType;

  prefix?: string;
  suffix?: string;
  decimalScale?: number;
  allowNegative?: boolean;
}
