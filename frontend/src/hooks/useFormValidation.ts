import { useState, useCallback } from "react";

type ValidationRule<T> = (value: T) => string | null;
type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

export function useFormValidation<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  // Validate a single field
  const validateField = useCallback(
    (fieldName: keyof T, value: T[keyof T]): string | null => {
      const rule = validationRules[fieldName];
      if (!rule) return null;
      return rule(value);
    },
    [validationRules]
  );

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  // Handle field change
  const handleChange = useCallback(
    (fieldName: keyof T) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        const value = e.target.value as T[keyof T];
        setValues((prev) => ({ ...prev, [fieldName]: value }));

        // Validate on change if field was touched
        if (touched[fieldName]) {
          const error = validateField(fieldName, value);
          setErrors((prev) => ({ ...prev, [fieldName]: error || undefined }));
        }
      },
    [touched, validateField]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (fieldName: keyof T) => () => {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
      const error = validateField(fieldName, values[fieldName]);
      setErrors((prev) => ({ ...prev, [fieldName]: error || undefined }));
    },
    [values, validateField]
  );

  // Set a specific field value
  const setValue = useCallback(
    (fieldName: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [fieldName]: value }));

      // Validate if touched
      if (touched[fieldName]) {
        const error = validateField(fieldName, value);
        setErrors((prev) => ({ ...prev, [fieldName]: error || undefined }));
      }
    },
    [touched, validateField]
  );

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Check if form has errors
  const hasErrors = Object.keys(errors).length > 0;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setValue,
    validateAll,
    validateField,
    reset,
    hasErrors,
    setValues,
    setErrors,
  };
}

export default useFormValidation;
