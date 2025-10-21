"use client";

import { useRouter } from "next/navigation";
type Props = {
  error: Error;
  message?: string;
  onRefresh?: () => void;
};

export const LoadingError = (props: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (props.onRefresh) props.onRefresh();
    else router.refresh();
  };

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-4">
        {props.message || "Błąd ładowania danych"}
      </h2>
      <p className="text-gray-700 mb-6">{props.error.message}</p>
      <button
        onClick={handleClick}
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
      >
        Odśwież stronę
      </button>
    </div>
  );
};
