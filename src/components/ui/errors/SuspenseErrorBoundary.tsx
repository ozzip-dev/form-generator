"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import DataLoader from "@/components/ui/loaders/DataLoader";
import { LoadingError } from "./LoadingError";

type Props = {
  children: React.ReactNode;
  errorMessage?: string;
  loadingMessage?: string;
  size: "sm" | "lg";
};
 

const SuspenseErrorBoundary = (props: Props) => {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    router.refresh();
  };

  return (
    <ErrorBoundary
      FallbackComponent={(errorProps) => (
        <LoadingError
          {...errorProps}
          message={props.errorMessage}
          onRefresh={handleRefresh}
          size={props.size}
        />
      )}
    >
      <Suspense
        fallback={
          <DataLoader message={props.loadingMessage} size={props.size} />
        }
      >
        <div key={refreshKey}>{props.children}</div>
      </Suspense>
    </ErrorBoundary>
  );
};
export default SuspenseErrorBoundary;
