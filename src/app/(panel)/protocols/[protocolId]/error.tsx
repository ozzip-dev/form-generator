"use client";

import { LoadingPageError } from "@/components/shared";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPageEditProtocol(props: Props) {
  return (
    <LoadingPageError {...props} message="Błąd ładowania danych protokołu" />
  );
}
