import DataLoader from "@/components/ui/loaders/DataLoader";

export default function LoadingPageDashboardModerator() {
  return <DataLoader className="min-h-[400px]" message="Ładowanie panelu" />;
}
