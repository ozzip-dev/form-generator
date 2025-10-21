"use client";
LoadingPageError;

import LoadingPageError from "@/components/ui/errors/LoadingPageError";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPageDashboardModerator(props: Props) {
  return <LoadingPageError {...props} message="Błąd ładowania danych panelu" />;
}
