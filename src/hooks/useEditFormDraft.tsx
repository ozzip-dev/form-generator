"use client";

import { useState, useRef, useCallback } from "react";
import { EditFormAction } from "@/actions/create-form/EditFormAction";

export function useEditFormDraft(formId?: string) {
  const [isLoading, setLoading] = useState<Record<string, boolean>>({});
  const debounceMap = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const handleEditFormDraft = useCallback(
    async (name: string, value: string) => {
      if (!formId) return;
      const key = `${formId}-${name}`;

      console.log("use top", value);

      if (debounceMap.current.has(key)) {
        clearTimeout(debounceMap.current.get(key)!);
      }

      const timeout = setTimeout(async () => {
        try {
          setLoading((prev) => ({ ...prev, [name]: true }));

          console.log("use", value);
          await EditFormAction(formId, { [name]: value });
        } finally {
          setLoading((prev) => ({ ...prev, [name]: false }));
          debounceMap.current.delete(key);
        }
      }, 1200);

      debounceMap.current.set(key, timeout);
    },
    [formId]
  );

  return { handleEditFormDraft, isLoading };
}
