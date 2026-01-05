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
};

const InputError = (props: Props) => {
  return (
    <div className="text-xs text-error h-4 absolute">{props?.errorMsg}</div>
  );
};

export default InputError;
