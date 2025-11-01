"use client";

import LoadingPageError from "@/components/ui/errors/LoadingPageError";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPagePrevievError(props: Props) {
  return (
    <LoadingPageError
      {...props}
      message="Błąd ładowania danych podglądu formularza"
    />
  );
}
