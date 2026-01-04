import { DataLoader } from "@/components/shared";

export default function LoadingPageEdit() {
  return (
    <DataLoader className="min-h-[400px]" message="Ładowanie formularza" />
  );
}
