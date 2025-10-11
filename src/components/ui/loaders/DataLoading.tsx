import Loader from "./Loader";

type DataLoadingProps = {
  message?: string;
  size?: "sm" | "lg";
  className?: string;
};

export default function DataLoading({
  message = "Ładowanie danych...",
  size = "lg",
  className = "",
}: DataLoadingProps) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <Loader size={size} />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}
