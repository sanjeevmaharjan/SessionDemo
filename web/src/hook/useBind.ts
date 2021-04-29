import React, { useState } from 'react';
import { FormControlProps } from 'react-bootstrap';

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
type S = FormControlProps['value'];

export type Binder = {
  value: S;
  setValue?: React.Dispatch<React.SetStateAction<S>>,
  onChange: React.ChangeEventHandler<FormControlElement>;
};

export const useBind = (defaultValue: S, useSetter: boolean = false): Binder => {
  const [value, setValue] = useState(defaultValue);

  if (useSetter) {
    return {
      value,
      setValue,
      onChange: (e) => {
        setValue(e.target.value);
      },
    };
  }

  return {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };
};
