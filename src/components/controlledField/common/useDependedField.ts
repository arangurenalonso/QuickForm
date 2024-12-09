'use client';
import { useEffect, useState } from 'react';
import { FieldValues, Control, UseFormWatch, Path } from 'react-hook-form';
import { DependentField } from './BaseControlledField';

type UseDependedFieldProp<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  watch: UseFormWatch<T>;
  dependentFields?: DependentField<T>[];
};
const useDependedField = <T extends FieldValues>({
  dependentFields,
  watch,
  control,
  name,
}: UseDependedFieldProp<T>) => {
  const [allFieldsHaveValues, setAllFieldsHaveValues] = useState(false);
  const [currentName, setCurrentName] = useState(name);

  useEffect(() => {
    if (!dependentFields) {
      setAllFieldsHaveValues(true);
      return;
    }
    const fields = dependentFields.map((dep) => {
      return typeof dep === 'string' ? dep : dep.field;
    });
    const { unsubscribe } = watch((_, { name }) => {
      if (!name) {
        return;
      }
      if (fields.includes(name)) {
        const isAllDependentFieldHaveValues = dependentFields.every((dep) => {
          if (typeof dep === 'string') {
            return (
              watch(dep) !== undefined &&
              watch(dep) !== null &&
              watch(dep) !== ''
            );
          } else {
            return watch(dep.field) === dep.value;
          }
        });
        setAllFieldsHaveValues(isAllDependentFieldHaveValues);
      }
    });
    return () => unsubscribe();
  }, [dependentFields, watch]);

  useEffect(() => {
    if (currentName !== name) {
      control.unregister(currentName);
      setCurrentName(name);
    }

    if (!allFieldsHaveValues) {
      control.unregister(name);
    } else {
      control.register(name);
    }
  }, [allFieldsHaveValues, control, name, currentName]);

  return {
    allFieldsHaveValues,
  };
};

export default useDependedField;
