// utils/handleInputChange.ts
import { EditFormAction } from "@/actions/create-form/EditFormAction";

// Globalna mapa timeoutów — unikalna dla każdego pola
const debounceMap = new Map<string, NodeJS.Timeout>();

export const handleInputChange = (
  formId: string | undefined,
  name: string,
  value: string
) => {
  const key = `${formId}-${name}`; // unikalny klucz dla danego pola

  // jeśli istnieje poprzedni timeout, usuń go
  if (debounceMap.has(key)) {
    clearTimeout(debounceMap.get(key));
  }

  // ustaw nowy timeout
  const timeout = setTimeout(async () => {
    await EditFormAction(formId!, { [name]: value });
    debounceMap.delete(key);
  }, 2000);

  debounceMap.set(key, timeout);
};
