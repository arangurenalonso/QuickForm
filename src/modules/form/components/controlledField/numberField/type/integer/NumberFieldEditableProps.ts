export default interface IntegerFieldEditableProps {
  name: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  informationText?: string;
  icon?: React.ElementType;

  prefix?: string;
  suffix?: string;
  allowNegative?: boolean;
}
