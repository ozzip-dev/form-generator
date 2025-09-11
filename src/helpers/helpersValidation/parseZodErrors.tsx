import { ZodError, ZodIssue } from "zod";

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
