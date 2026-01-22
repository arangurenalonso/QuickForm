export interface NumberFieldValidationRules {
  required: boolean;
  max?: number;
  min?: number;
}

export interface NumberFieldValidationRulesWithMessage {
  required: string | boolean;
  max?: { value: number; message: string };
  min?: { value: number; message: string };
}
