import DecimalFieldEditableAttributesForm from '../../numberField/form/decimal/DecimalFieldEditableAttributesForm';
import DecimalFieldRulesForm from '../../numberField/form/decimal/DecimalFieldRulesForm';
import IntegerFieldEditableAttributesForm from '../../numberField/form/integer/IntegerFieldEditableAttributesForm';
import IntegerFieldRulesForm from '../../numberField/form/integer/IntegerFieldRulesForm';
import NumberFieldComponent from '../../numberField/NumberFieldComponent';
import NumberFieldControlled from '../../numberField/NumberFieldControlled';
import NumberFieldEditableProps from '../../numberField/type/NumberFieldEditableProps';
import { NumberFieldValidationRulesWithMessage } from '../../numberField/type/NumberFieldValidationRules';
import TextFieldEditableAttributesForm from '../../textfield/form/TextFieldEditableAttributesForm';
import TextFieldRulesForm from '../../textfield/form/TextFieldRulesForm';
import TextFieldComponent from '../../textfield/TextFieldComponent';
import TextFieldControlled from '../../textfield/TextFieldControlled';
import TextFieldEditableProps from '../../textfield/type/TextFieldEditableProps';
import { TextFieldValidationRulesWithMessage } from '../../textfield/type/TextFieldValidationRules';
import { FieldTypeEnum } from './FieldType';

export type FormFieldConfigType =
  | {
      id: string;
      icon: React.ElementType;
      label: string;
      type: FieldTypeEnum.InputTypeDecimal;
      properties: NumberFieldEditableProps;
      rules: NumberFieldValidationRulesWithMessage;
      render: {
        Component: typeof NumberFieldComponent;
        Controlled: typeof NumberFieldControlled;
        EditablePropsForm: typeof DecimalFieldEditableAttributesForm;
        RulesForm: typeof DecimalFieldRulesForm;
      };
    }
  | {
      id: string;
      icon: React.ElementType;
      label: string;
      type: FieldTypeEnum.InputTypeInteger;
      properties: NumberFieldEditableProps;
      rules: NumberFieldValidationRulesWithMessage;
      render: {
        Component: typeof NumberFieldComponent;
        Controlled: typeof NumberFieldControlled;
        EditablePropsForm: typeof IntegerFieldEditableAttributesForm;
        RulesForm: typeof IntegerFieldRulesForm;
      };
    }
  | {
      id: string;
      icon: React.ElementType;
      label: string;
      type: FieldTypeEnum.InputTypeText;
      properties: TextFieldEditableProps;
      rules: TextFieldValidationRulesWithMessage;
      render: {
        Component: typeof TextFieldComponent;
        Controlled: typeof TextFieldControlled;
        EditablePropsForm: typeof TextFieldEditableAttributesForm;
        RulesForm: typeof TextFieldRulesForm;
      };
    };
