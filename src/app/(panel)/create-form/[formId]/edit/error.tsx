"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        Wystąpił błąd
      </h2>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}
