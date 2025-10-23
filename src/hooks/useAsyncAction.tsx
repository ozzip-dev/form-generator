import { useState, useCallback } from "react";

export function useAsyncAction<T extends (...args: any[]) => Promise<void>>(
  asyncFn: T
) {
  const [isLoading, setLoading] = useState(false);

  const runAction = useCallback(
    async (...args: Parameters<T>): Promise<void> => {
      setLoading(true);
      try {
        await asyncFn(...args);
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFn]
  );

  return { runAction, isLoading };
}
