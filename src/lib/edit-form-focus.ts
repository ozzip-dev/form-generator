const storageKey = (formId: string) => `fg-focus-last-edit-field:${formId}`;

/** Call after a new field was saved; paired with `consumeFocusOnLastEditField`. */
export function markLastEditFieldForFocus(formId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(storageKey(formId), "1");
}

/** Returns true once per add, for the last field row only. */
export function consumeFocusOnLastEditField(formId: string): boolean {
  if (typeof window === "undefined") return false;
  const key = storageKey(formId);
  if (sessionStorage.getItem(key) !== "1") return false;
  sessionStorage.removeItem(key);
  return true;
}
