"use client";

export type ErrorValue =
  | string
  | undefined
  | null
  | string[]
  | { message: string };

export function normalizeError(error: ErrorValue): string | undefined {
  if (!error) return undefined;

  if (typeof error === "string") return error;

  if (Array.isArray(error)) return error[0];

  if (typeof error === "object" && "message" in error) return error.message;

  return undefined;
}

type Props = {
  errorMsg?: string;
  nameId?: string;
};

const InputError = (props: Props) => {
  return (
    <div
      id={props.nameId ? `${props.nameId}-error` : undefined}
      className="absolute -bottom-[1.7rem] left-2 text-2xs text-error"
      role="alert"
      aria-live="assertive"
    >
      {props.errorMsg || "\u00A0"}{" "}
    </div>
  );
};

export default InputError;
