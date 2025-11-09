import { useState, useCallback } from "react";
import { useErrorBoundary } from "react-error-boundary";

export function useAsyncAction<T extends (...args: any[]) => Promise<void>>(
  asyncFn: T
) {
  const { showBoundary } = useErrorBoundary();
  const [isLoading, setLoading] = useState(false);

  const runAction = useCallback(
    async (...args: Parameters<T>): Promise<void> => {
      setLoading(true);
      try {
        await asyncFn(...args);
      } catch (err) {
        showBoundary(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [asyncFn, showBoundary]
  );

  return { runAction, isLoading };
}
