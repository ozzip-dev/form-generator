"use client";

import Button from "../buttons/Button";

type Props = {
  error: Error;
  reset: () => void;
  message?: string;
};

const LoadingPageError = (props: Props) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <h2 className="mb-4 text-2xl font-semibold text-red-700">
        {props.message ? props.message : "Błąd ładowania danych"}
      </h2>
      <p className="text-gray-700 mb-6">{props.error.message}</p>
      <Button
        onClickAction={() => window.location.reload()}
        className="bg-error px-2 text-white"
        variant="ghost"
      >
        Odśwież
      </Button>
    </div>
  );
};

export default LoadingPageError;
