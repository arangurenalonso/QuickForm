import DecimalFieldControlled from '../../numberField/controlled/DecimalFieldControlled';
import IntegerFieldControlled from '../../numberField/controlled/IntegerFieldControlled';
import DecimalFieldEditableAttributesForm from '../../numberField/form/decimal/DecimalFieldEditableAttributesForm';
import DecimalFieldRulesForm from '../../numberField/form/decimal/DecimalFieldRulesForm';
import IntegerFieldEditableAttributesForm from '../../numberField/form/integer/IntegerFieldEditableAttributesForm';
import IntegerFieldRulesForm from '../../numberField/form/integer/IntegerFieldRulesForm';
import NumberFieldComponent from '../../numberField/NumberFieldComponent';
import DecimalFieldEditableProps from '../../numberField/type/decimal/DecimalFieldEditableProps';
import IntegerFieldEditableProps from '../../numberField/type/integer/NumberFieldEditableProps';
import { NumberFieldValidationRulesWithMessage } from '../../numberField/type/NumberFieldValidationRules';
import TextFieldEditableAttributesForm from '../../textfield/form/TextFieldEditableAttributesForm';
import TextFieldRulesForm from '../../textfield/form/TextFieldRulesForm';
import TextFieldComponent from '../../textfield/TextFieldComponent';
import TextFieldControlled from '../../textfield/TextFieldControlled';
import TextFieldEditableProps from '../../textfield/type/TextFieldEditableProps';
import { TextFieldValidationRulesWithMessage } from '../../textfield/type/TextFieldValidationRules';
import { FieldTypeEnum } from './FieldType';
import { FieldEditorProps } from '../type/FieldEditorProps';

export type FormFieldConfigType =
  | {
      id: string;
      icon: React.ElementType;
      label: string;
      type: FieldTypeEnum.InputTypeDecimal;
      properties: DecimalFieldEditableProps;
      rules: NumberFieldValidationRulesWithMessage;
      render: {
        Component: typeof NumberFieldComponent;
        Controlled: typeof DecimalFieldControlled;
        EditablePropsForm: React.ComponentType<FieldEditorProps>;
        RulesForm: React.ComponentType<FieldEditorProps>;
      };
    }
  | {
      id: string;
      icon: React.ElementType;
      label: string;
      type: FieldTypeEnum.InputTypeInteger;
      properties: IntegerFieldEditableProps;
      rules: NumberFieldValidationRulesWithMessage;
      render: {
        Component: typeof NumberFieldComponent;
        Controlled: typeof IntegerFieldControlled;
        EditablePropsForm: React.ComponentType<FieldEditorProps>;
        RulesForm: React.ComponentType<FieldEditorProps>;
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
        EditablePropsForm: React.ComponentType<FieldEditorProps>;
        RulesForm: React.ComponentType<FieldEditorProps>;
      };
    };
