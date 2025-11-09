import { EditFormHeaderAction } from "@/actions/edit-form/EditFormHeaderAction";

const debounceMap = new Map<string, NodeJS.Timeout>();

export const handleEditFormDraft = (
  formId: string | undefined,
  name: string,
  value: string
) => {
  const key = `${formId}-${name}`;

  if (debounceMap.has(key)) {
    clearTimeout(debounceMap.get(key));
  }

  const timeout = setTimeout(async () => {
    await EditFormHeaderAction(formId!, { [name]: value });
    debounceMap.delete(key);
  }, 2000);

  debounceMap.set(key, timeout);
};
