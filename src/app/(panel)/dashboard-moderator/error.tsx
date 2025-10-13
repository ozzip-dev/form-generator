"use client";

import { FallbackProps } from "react-error-boundary";

type Props = FallbackProps;

export default function Error({ error, resetErrorBoundary }: Props) {
  return (
    <div className="p-6 text-center text-red-700">
      <h2 className="text-lg font-semibold mb-2">Błąd ładowania formularzy</h2>
      <p className="mb-4 text-sm text-gray-700">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Odśwież
      </button>
    </div>
  );
}
