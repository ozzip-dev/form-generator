import DataLoader from "@/components/ui/loaders/DataLoader";

export default function LoadingPagePreview() {
  return (
    <DataLoader
      className="min-h-[400px]"
      message="Ładowanie podglądu formularza"
    />
  );
}
