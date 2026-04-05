'use client';

import { Control, FieldValues, Path, UseFormWatch } from 'react-hook-form';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';
import { FieldTypeEnum } from '../../common/enum/FieldType';
import TextFieldControlled from '../../textfield/TextFieldControlled';
import IntegerFieldControlled from '../../numberField/controlled/IntegerFieldControlled';
import DecimalFieldControlled from '../../numberField/controlled/DecimalFieldControlled';
import { mapFieldRulesToReactHookForm } from '../helper/mapFieldRulesToReactHookForm';

type Props<T extends FieldValues> = {
  itemFields: FormFieldConfigType[];
  control: Control<T>;
  watch: UseFormWatch<T>;
};

const CollectionItemFieldsRenderer = <T extends FieldValues>({
  itemFields,
  control,
  watch,
}: Props<T>) => {
  return (
    <div className="space-y-4">
      {itemFields.map((field) => {
        switch (field.type) {
          case FieldTypeEnum.InputTypeText: {
            const { name, ...properties } = field.properties;

            return (
              <TextFieldControlled
                key={field.id}
                name={name as Path<T>}
                control={control}
                watch={watch}
                rules={mapFieldRulesToReactHookForm<T>(field)}
                {...properties}
              />
            );
          }

          case FieldTypeEnum.InputTypeInteger: {
            const { name, ...properties } = field.properties;

            return (
              <IntegerFieldControlled
                key={field.id}
                name={name as Path<T>}
                control={control}
                watch={watch}
                rules={mapFieldRulesToReactHookForm<T>(field)}
                {...properties}
              />
            );
          }

          case FieldTypeEnum.InputTypeDecimal: {
            const { name, ...properties } = field.properties;

            return (
              <DecimalFieldControlled
                key={field.id}
                name={name as Path<T>}
                control={control}
                watch={watch}
                rules={mapFieldRulesToReactHookForm<T>(field)}
                {...properties}
              />
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
};

export default CollectionItemFieldsRenderer;
