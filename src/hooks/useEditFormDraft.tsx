"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { EditFormAction } from "@/actions/create-form/EditFormAction";
import { UseFormTrigger } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";

export function useEditFormDraft(
  formId?: string,
  trigger?: UseFormTrigger<any>
) {
  const { showBoundary } = useErrorBoundary();
  const [isLoading, setLoading] = useState<Record<string, boolean>>({});
  const debounceMap = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const handleEditFormDraft = useCallback(
    (name: string, value: string) => {
      if (!formId) return;

      const key = `${formId}-${name}`;

      if (debounceMap.current.has(key)) {
        clearTimeout(debounceMap.current.get(key)!);
      }

      const timeout = setTimeout(async () => {
        if (trigger) {
          const isValid = await trigger(name);
          if (!isValid) {
            debounceMap.current.delete(key);
            return;
          }
        }

        try {
          setLoading((prev) => ({ ...prev, [name]: true }));
          await EditFormAction(formId, { [name]: value });
        } catch (err) {
          showBoundary(err);
        } finally {
          setLoading((prev) => ({ ...prev, [name]: false }));
          debounceMap.current.delete(key);
        }
      }, 800);

      debounceMap.current.set(key, timeout);
    },
    [formId, trigger]
  );

  useEffect(() => {
    return () => {
      debounceMap.current.forEach((timeout) => clearTimeout(timeout));
      debounceMap.current.clear();
    };
  }, []);

  return { handleEditFormDraft, isLoading };
}
