import { ZodError, ZodIssue } from "zod";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

export type FieldError = { type: string; message: string };
export type FieldErrors = Record<string, FieldError>;

export function parseZodErrors(zodError: ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};

  zodError.issues.forEach((issue: ZodIssue) => {
    const path = issue.path.map(String).join(".");
    if (!path) return;
    fieldErrors[path] = {
      type: issue.code,
      message: issue.message,
    };
  });

  return fieldErrors;
}

export function handleFormErrors<T extends FieldValues>(
  errors: FieldErrors | { error: FieldErrors },
  setError: UseFormSetError<T>
) {
  const fieldErrors = "error" in errors ? errors.error : errors;

  Object.entries(fieldErrors).forEach(([field, error]) => {
    setError(field as Path<T>, {
      type: error.type === "auth" ? "server" : error.type,
      message: error.message,
    });
  });
}

export function setServerErrors<T extends FieldValues>(
  errors: FieldErrors,
  setError: UseFormSetError<T>
) {
  handleFormErrors(errors, setError);
}
