"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import LoadingError from "./LoadingError";
import DataLoader from "../loaders/DataLoader";

type Props = {
  children: React.ReactNode;
  errorMessage?: string;
  loadingMessage?: string;
  size: "sm" | "lg";
};

const SuspenseErrorBoundary = (props: Props) => {
  return (
    <ErrorBoundary
      FallbackComponent={(errorProps) => (
        <LoadingError
          {...errorProps}
          message={props.errorMessage}
          size={props.size}
        />
      )}
    >
      <Suspense
        fallback={
          <DataLoader message={props.loadingMessage} size={props.size} />
        }
      >
        <div>{props.children}</div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseErrorBoundary;
