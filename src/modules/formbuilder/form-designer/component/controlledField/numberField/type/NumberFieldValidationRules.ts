import { WithMessages } from '../../common/enum/rule.type';

// 1) Base (valores simples → form / UI)
export interface NumberFieldValidationRulesBase {
  required?: boolean;
  max?: number;
  min?: number;
}

// 2) Tipos finales
export type NumberFieldValidationRules = NumberFieldValidationRulesBase;

export type NumberFieldValidationRulesWithMessage =
  WithMessages<NumberFieldValidationRulesBase>;
