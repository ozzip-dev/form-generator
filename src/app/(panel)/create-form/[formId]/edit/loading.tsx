import DataLoader from "@/components/ui/loaders/DataLoader";

export default function LoadingPageEdit() {
  return (
    <DataLoader className="min-h-[400px]" message="Ładowanie formularza" />
  );
}
