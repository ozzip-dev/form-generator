export function handleNextRedirectError(err: any) {
  const digest = err?.digest;
  const message = err?.message;

  if (
    digest === "NEXT_REDIRECT" ||
    (typeof digest === "string" && digest.includes("NEXT_REDIRECT")) ||
    message === "NEXT_REDIRECT"
  ) {
    throw err;
  }
}
