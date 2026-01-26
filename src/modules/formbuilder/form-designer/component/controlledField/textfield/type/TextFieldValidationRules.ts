import { WithMessages } from '../../common/enum/rule.type';

// 1) Base (valores simples → form / UI)
export interface TextFieldValidationRulesBase {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
}

// 2) Tipos finales
export type TextFieldValidationRules = TextFieldValidationRulesBase;

export type TextFieldValidationRulesWithMessage =
  WithMessages<TextFieldValidationRulesBase>;
