"use client";

import { useRouter } from "next/navigation";
type Props = {
  error: Error;
  message?: string;
  size: "sm" | "lg";
  onRefresh?: () => void;
};

export const LoadingError = (props: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (props.onRefresh) props.onRefresh();
    else router.refresh();
  };

  if (props.size === "lg")
    return (
      <div className="flex flex-col items-center justify-center text-center p-4">
        <h2 className="font-semibold text-red-600 text-lg mb-2">
          {props.message || "Błąd ładowania danych"}
        </h2>
        <p className="text-gray-700 text-sm mb-4">{props.error.message}</p>
        <button
          onClick={handleClick}
          className="px-4 py-1 bg-red-600 text-white text-sm font-medium rounded shadow hover:bg-red-700 transition"
        >
          Odśwież
        </button>
      </div>
    );

  if (props.size === "sm")
    return (
      <div className="flex items-center justify-center text-center gap-3 p-2">
        <h2 className="font-semibold text-red-600 text-sm">
          {props.message || "Błąd ładowania danych"}
        </h2>
        <p className="text-gray-700 text-sm truncate max-w-[250px]">
          {props.error.message}
        </p>
        <button
          onClick={handleClick}
          className="px-3 py-0.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition"
        >
          Odśwież
        </button>
      </div>
    );
};
