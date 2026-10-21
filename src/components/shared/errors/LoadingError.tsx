"use client";

import Button from "../buttons/Button";
type Props = {
  error: Error;
  message?: string;
  size: "sm" | "lg";
};

const LoadingError = (props: Props) => {
  if (props.size === "lg")
    return (
      <div className="flex h-[400px] flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-2 text-lg font-semibold text-red-600">
          {props.message || "Błąd ładowania danych"}
        </h2>
        <p className="text-gray-700 mb-4 text-sm">{props.error.message}</p>
        <Button
          onClickAction={() => window.location.reload()}
          className="!bg-error px-2 text-white"
          variant="ghost"
        >
          Odśwież
        </Button>
      </div>
    );

  if (props.size === "sm")
    return (
      <div className="flex items-center justify-center gap-3 p-2 text-center">
        <h2 className="text-sm font-semibold text-red-600">
          {props.message || "Błąd ładowania danych"}
        </h2>
        <p className="text-gray-700 max-w-[250px] truncate text-sm">
          {props.error.message}
        </p>
        <Button
          onClickAction={() => window.location.reload()}
          className="!bg-error px-4 text-white"
          variant="ghost"
        >
          Odśwież
        </Button>
      </div>
    );
};

export default LoadingError;
