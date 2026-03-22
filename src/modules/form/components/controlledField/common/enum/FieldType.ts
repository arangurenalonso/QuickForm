export enum FieldTypeEnum {
  // LineBreak = 'LineBreak',
  // Array = 'Array',
  // Select = 'Select',
  InputTypeText = 'InputTypeText',
  InputTypeInteger = 'InputTypeInteger',
  InputTypeDecimal = 'InputTypeDecimal',
}
export enum UpdatedTypeEnum {
  EditableForm = 'EditableForm',
  RuleForm = 'RuleForm',
}

export type FieldType =
  // | FieldTypeEnum.LineBreak
  // | FieldTypeEnum.Array
  // | FieldTypeEnum.Select
  | FieldTypeEnum.InputTypeText
  | FieldTypeEnum.InputTypeInteger
  | FieldTypeEnum.InputTypeDecimal;

export const getFriendlyFieldTypeName = (type: FieldTypeEnum): string => {
  switch (type) {
    case FieldTypeEnum.InputTypeText:
      return 'Text';
    case FieldTypeEnum.InputTypeInteger:
      return 'Integer';
    case FieldTypeEnum.InputTypeDecimal:
      return 'Decimal';
    default:
      return 'Field';
  }
};
// TextArea="TextArea",
// | FieldTypeEnum.Select
// DatePicker="DatePicker",
// Checkbox="Checkbox",
// Radio="Radio",
// Switch="Switch",
// Upload="Upload",

/**
 * Title
 * Subtitle
 * paragraph
 * Separator
 * SpacerField
 */

// DatePicker="DatePicker",
// TimePicker="TimePicker",
// Radio="Radio",
// Checkbox="Checkbox",
// Switch="Switch",
// Slider="Slider",
// Rate="Rate",
// Upload="Upload",
// Button="Button",
// Text="Text",
// Password="Password",
// TextArea="TextArea",
// AutoComplete="AutoComplete",
// Cascader="Cascader",
// TreeSelect="TreeSelect",
// Transfer="Transfer",
// Tag="Tag",
// Mention="Mention",
