export const isTestEnv = () => process.env.NEXT_PUBLIC_APP_ENV === "test";

export const iSiOS = () =>
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes("Mac") && "ontouchend" in document);
