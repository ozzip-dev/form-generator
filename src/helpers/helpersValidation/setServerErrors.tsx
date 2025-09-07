import { FieldValues, UseFormSetError, Path } from "react-hook-form";

type ServerError = {
  [key: string]: { message: string } | string | ServerError;
};

export function setServerErrors<T extends FieldValues>(
  errors: ServerError,
  setError: UseFormSetError<T>,
  parentKey: string = ""
) {
  Object.entries(errors).forEach(([field, error]) => {
    const path = parentKey ? `${parentKey}.${field}` : field;

    if (typeof error === "string" || (error as any).message) {
      const message =
        typeof error === "string" ? error : (error as any).message;

      setError(path as Path<T>, {
        type: "server",
        message,
      });
    } else if (typeof error === "object" && error !== null) {
      setServerErrors<T>(error as ServerError, setError, path);
    }
  });
}
