import DataLoading from "@/components/ui/loaders/DataLoading";

export default function LoadingPageEdit() {
  return (
    <DataLoading className="min-h-[400px]" message="Ładowanie formularza" />
  );
}
