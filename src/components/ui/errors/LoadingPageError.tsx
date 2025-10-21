"use client";

type Props = {
  error: Error;
  reset: () => void;
  message?: string;
};

const LoadingPageError = (props: Props) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-4">
        {props.message ? props.message : "Błąd ładowania danych"}
      </h2>
      <p className="text-gray-700 mb-6">{props.error.message}</p>
      <button
        onClick={() => props.reset()}
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
      >
        Odśwież stronę
      </button>
    </div>
  );
};

export default LoadingPageError;
