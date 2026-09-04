import { cloneElement, isValidElement, useId, type ReactElement } from "react";

type FieldElementProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  required?: boolean;
  error?: boolean;
};

export interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactElement<FieldElementProps>;
}

export function FormField({
  label,
  hint,
  error,
  required,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const id = children.props.id ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const field = isValidElement(children)
    ? cloneElement(children, {
        id,
        required,
        error: Boolean(error),
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className="ui-form-group">
      <label className="ui-label" htmlFor={id}>
        {label}
        {required && (
          <span className="ui-required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {field}
      {hint && (
        <p className="ui-hint" id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className="ui-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
