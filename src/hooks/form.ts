import { useState, useEffect, useCallback, useMemo } from "react";

interface FieldValidation<T> {
  is: (value: T) => boolean;
  message: string | null;
}

interface FieldOptions<T> {
  validation?: FieldValidation<T> | null;
  initialValue: T;
}

interface ReturnUseFieldHook<T = any> {
  key: string;
  initialValue: T;
  value: T;
  valid: boolean;
  message: string | null;
  onChange: (value: T) => void;
  showMessage: () => void;
  hideMessage: () => void;
}

// As form validation can be complex, as a form can be in multiple states simultaneously (e.g. not valid, and yet not showing an error)
// these hooks are designed to abstract away validation logic and form controls through a simple API, so that components can focus on performing
// render logic

export const useField = <T = string>(
  key: string,
  options: FieldOptions<T>
): ReturnUseFieldHook<T> => {
  const [value, setValue] = useState<T>(options.initialValue);
  const [valid, setValidity] = useState<boolean>(false);
  const [messageVisible, setMessageVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (options?.validation) {
      setValidity(options.validation.is(value));
    }
  }, [value, options]);

  const onChange = useCallback((value: T) => {
    setValue(value);
  }, []);

  const showMessage = useCallback(() => {
    setMessageVisibility(true);
  }, []);

  const hideMessage = useCallback(() => {
    setMessageVisibility(false);
  }, []);

  return {
    key,
    initialValue: options.initialValue,
    value,
    valid,
    message: (!valid && messageVisible && options?.validation?.message) || null,
    onChange,
    showMessage,
    hideMessage
  };
};

interface ReturnUseFormHook<T> {
  getState: () => T;
  clear: () => void;
  isSubmittable: boolean;
}

export const useForm = <T>(
  ...fields: ReturnUseFieldHook[]
): ReturnUseFormHook<T> => {
  const isSubmittable = useMemo(() => fields.every(field => field.valid), [
    fields
  ]);

  const getState = useCallback(() => {
    return fields.reduce((o, field) => {
      return {
        ...o,
        [field.key]: field.value
      };
    }, {}) as T;
  }, [fields]);

  const clear = useCallback(() => {
    fields.forEach(field => {
      field.onChange(field.initialValue);
      field.hideMessage();
    });
  }, [fields]);

  return {
    getState,
    isSubmittable,
    clear
  };
};
