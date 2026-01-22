export interface TextFieldValidationRules {
  required: boolean;
  maxLength?: number;
  minLength?: number;
}

export interface TextFieldValidationRulesWithMessage {
  required: string | boolean;
  maxLength?: { value: number; message: string };
  minLength?: { value: number; message: string };
}
