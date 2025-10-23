"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import DataLoading from "@/components/ui/loaders/DataLoading";
import { LoadingError } from "./LoadingError";

type Props = {
  children: React.ReactNode;
  errorMessage?: string;
  loadingMessage?: string;
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
        />
      )}
    >
      <Suspense fallback={<DataLoading message={props.loadingMessage} />}>
        <div key={refreshKey}>{props.children}</div>
      </Suspense>
    </ErrorBoundary>
  );
};
export default SuspenseErrorBoundary;
