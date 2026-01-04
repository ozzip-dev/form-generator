import { DataLoader } from "@/components/shared";

export default function LoadingPagePreview() {
  return (
    <DataLoader
      className="min-h-[400px]"
      message="Ładowanie podglądu formularza"
    />
  );
}
