export function handleNextRedirectError(err: any) {
  const { digest, message } = err || {};
  const nextRedirect: string = "NEXT_REDIRECT";
  const isString: boolean = typeof digest === "string"
  
  if (
    (isString && digest.includes(nextRedirect)) ||
    message === nextRedirect
  ) {
    throw err;
  }
}
