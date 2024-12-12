export enum FieldTypeEnum {
  // LineBreak = 'LineBreak',
  // Array = 'Array',
  // Select = 'Select',
  InputTypeText = 'InputTypeText',
  InputTypeNumber = 'InputTypeNumber',
}
export enum UpdatedTypeEnum {
  EditableForm = 'EditableForm',
  RuleForm = 'RuleForm',
}

export type FieldType =
  // | FieldTypeEnum.LineBreak
  // | FieldTypeEnum.Array
  // | FieldTypeEnum.Select
  FieldTypeEnum.InputTypeText | FieldTypeEnum.InputTypeNumber;

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
// InputNumber="InputNumber",
// TreeSelect="TreeSelect",
// Transfer="Transfer",
// Tag="Tag",
// Mention="Mention",
