import React from 'react';

type PhoneFieldEditableProps = {
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  informationText?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  locale?: string;
  defaultCountryIso2?: string;
};

export default PhoneFieldEditableProps;
