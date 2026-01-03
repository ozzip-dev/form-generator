"use client";

import { LoadingPageError } from "@/components/shared";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPageAddProtocol(props: Props) {
  return (
    <LoadingPageError {...props} message="Błąd przesyłu danych protokołu" />
  );
}
