"use client";

import { useState, useRef, useCallback } from "react";
import { EditFormAction } from "@/actions/create-form/EditFormAction";

export function useEditFormDraft(formId?: string) {
  const [savingFields, setSavingFields] = useState<Record<string, boolean>>({});
  const debounceMap = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const handleEditFormDraft = useCallback(
    (name: string, value: string) => {
      if (!formId) return;
      const key = `${formId}-${name}`;

      if (debounceMap.current.has(key)) {
        clearTimeout(debounceMap.current.get(key)!);
      }

      console.log("name", name);
      console.log("vale", value);
      console.log("formId", formId);
      const timeout = setTimeout(async () => {
        try {
          setSavingFields((prev) => ({ ...prev, [name]: true }));
          await EditFormAction(formId, { [name]: value });
        } finally {
          setSavingFields((prev) => ({ ...prev, [name]: false }));
          debounceMap.current.delete(key);
        }
      }, 1200);

      debounceMap.current.set(key, timeout);
    },
    [formId]
  );

  return { handleEditFormDraft, savingFields };
}
