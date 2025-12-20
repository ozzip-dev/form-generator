import { ZodError, ZodIssue } from "zod";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

export type ModelFieldError = { type: string; message: string };
export type ModelFieldErrors = Record<string, ModelFieldError>;

export type ValidationErrors = Record<string, string[] | undefined>;

export function handleServerErrors(zodError: ZodError): ModelFieldErrors {
  const fieldErrors: ModelFieldErrors = {};

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

type ErrorValue = string[] | { type?: string; message?: string } | undefined;

const resolveErrorMessage = (error: ErrorValue): string => {
  if (!error) return "Błąd serwera";

  if (Array.isArray(error)) {
    return error[0] ?? "Błąd walidacji";
  }

  if (typeof error === "object" && "message" in error) {
    return error.message ?? "Błąd walidacji";
  }

  return "Błąd walidacji";
};

export const setClientErrors = <T extends FieldValues>(
  errors: Record<
    string,
    string[] | { type?: string; message?: string } | undefined
  >,
  setError: UseFormSetError<T>
) => {
  Object.entries(errors).forEach(([field, error]) => {
    console.log("field", field, error);
    setError(field as Path<T>, {
      type: "server",
      message: resolveErrorMessage(error),
    });
  });
};
