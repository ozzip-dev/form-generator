"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { UseFormTrigger } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";
import { EditInputsTextAction } from "@/actions/input";

export function useEditFormInput(
  formId?: string,
  inputId?: string,
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

        const bodyKeyName = name.split(".").pop();

        try {
          setLoading((prev) => ({ ...prev, [name]: true }));
          await EditInputsTextAction(formId, inputId!, {
            [bodyKeyName as string]: value.trim(),
          });
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
