import { ZodError, ZodIssue } from "zod";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

export type ModelFieldError = { type: string; message: string };
export type MoledFieldErrors = Record<string, ModelFieldError>;

export function handleServerErrors(zodError: ZodError): MoledFieldErrors {
  const fieldErrors: MoledFieldErrors = {};

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

export function handleClientErrors<T extends FieldValues>(
  errors: MoledFieldErrors | { error: MoledFieldErrors },
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
