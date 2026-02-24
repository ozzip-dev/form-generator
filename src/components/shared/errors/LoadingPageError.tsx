"use client";

import Button from "../buttons/Button";

type Props = {
  error: Error;
  reset: () => void;
  message?: string;
};

const LoadingPageError = (props: Props) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-2xl font-semibold text-red-700 mb-4">
        {props.message ? props.message : "Błąd ładowania danych"}
      </h2>
      <p className="text-gray-700 mb-6">{props.error.message}</p>
      <Button
        onClickAction={() => window.location.reload()}
        className="bg-error text-white px-2"
        variant="ghost"
        message="Odśwież"
      />
    </div>
  );
};

export default LoadingPageError;
