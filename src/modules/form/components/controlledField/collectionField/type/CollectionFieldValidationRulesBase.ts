import { WithMessages } from '../../common/enum/rule.type';

export interface CollectionFieldValidationRulesBase {
  required?: boolean | null | undefined;
  minItems?: number | null | undefined;
  maxItems?: number | null | undefined;
}

export type CollectionFieldValidationRules = CollectionFieldValidationRulesBase;

export type CollectionFieldValidationRulesWithMessage =
  WithMessages<CollectionFieldValidationRulesBase>;
