import React, { useState } from 'react';
import { FieldTypeEnum } from './enum/FieldType';
import { FormFieldConfigType } from './enum/FormFieldConfigType';
import { NumberFieldConfig } from './numberField/NumberFieldConfig';
import { TextFieldConfig } from './textfield/TextFieldConfig';

export const DynamicForm: React.FC = () => {
  // Estado para manejar los campos dinámicos
  const [fields, setFields] = useState<FormFieldConfigType[]>([]);

  const addField = (type: FieldTypeEnum) => {
    const newField =
      type === FieldTypeEnum.InputTypeNumber
        ? NumberFieldConfig()
        : TextFieldConfig();

    setFields((prevFields) => [...prevFields, newField]);
  };

  return (
    <div>
      <h2>Dynamic Form</h2>
      <button onClick={() => addField(FieldTypeEnum.InputTypeNumber)}>
        Add Number Field
      </button>
      <button onClick={() => addField(FieldTypeEnum.InputTypeText)}>
        Add Text Field
      </button>

      <form>
        {fields.map((field) => {
          const { id, properties, render } = field;
          const { Component, EditablePropsForm } = render;

          return (
            <div
              key={id}
              className="border p-5"
              style={{ marginBottom: '1rem' }}
            >
              <div className="grid grid-cols-2">
                <div className="bg-blue-500 p-4">
                  <Component {...properties} />
                </div>
                <div className="bg-green-500 p-4">
                  <EditablePropsForm formFieldConfig={field} />
                </div>
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default DynamicForm;
