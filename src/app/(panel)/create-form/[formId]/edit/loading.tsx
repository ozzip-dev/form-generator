import Loader from "@/components/ui/loaders/Loader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader size="lg" />
      </div>
    </div>
  );
}
