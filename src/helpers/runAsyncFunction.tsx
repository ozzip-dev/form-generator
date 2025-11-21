export async function runAsyncAction<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("runAsyncAction error:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}
